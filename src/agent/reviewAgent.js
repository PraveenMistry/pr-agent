const { getProvider } = require("../providers/providerFactory");
const { analyzePR } = require("../services/llmService");
const { buildPrompt } = require("../utils/promptBuilder");
const { validateReviewInput } = require("../utils/validator");
const { cleanLLMResponse } = require("../utils/formatter");
const { safeParseJSON } = require("../utils/jsonParser");
const { chunkText } = require("../utils/chunker");
const { logInfo, logError } = require("../utils/logger");
const pLimit = require("p-limit");
const limit = pLimit(3);

async function runReviewAgent(input) {
  try {
    logInfo("Agent started", input);

    const validationError = validateReviewInput(input);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const { providerType, owner, repo, prNumber } = input;

    const provider = getProvider(providerType);
    if (provider.error) {
      return { success: false, error: provider.error };
    }
    
    const diff = await provider.getPRDiff(owner, repo, prNumber);
    
    
    if (!diff || diff.trim().length === 0) {
      return {
        success: false,
        error: "PR diff is empty or invalid"
      };
    }

    const chunks = chunkText(diff);

    const promises = chunks.map((chunk) =>
      limit(async () => {
        try {
          const prompt = buildPrompt(chunk);

          const raw = await analyzePR(prompt);

          const cleaned = cleanLLMResponse(raw);
          const parsed = safeParseJSON(cleaned);

          if (!parsed) {
            logError("Invalid JSON from LLM", cleaned);
            return null; // instead of continue
          }

          return parsed;

        } catch (err) {
          logError("Chunk failed", err);
          return null;
        }
      })
    );

    const results = (await Promise.all(promises)).filter(Boolean);

    const merged = mergeResults(results);

    const comment = `
      ## 🤖 AI PR Review

      \`\`\`json
      ${JSON.stringify(merged, null, 2)}
      \`\`\`
    `;

    await provider.postComment(owner, repo, prNumber, comment);

    return { success: true };

  } catch (err) {
    logError("Agent failed", err);
    return { success: false, error: err.message };
  }
}

function mergeResults(results) {
  const merged = {
    bugs: [],
    performance_issues: [],
    improvements: [],
    index_suggestions: [],
    edge_cases: []
  };

  for (const res of results) {
    for (const key in merged) {
      merged[key].push(...(res[key] || []));
    }
  }

  return merged;
}

module.exports = { runReviewAgent };