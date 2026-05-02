const { getProvider } = require("../providers/providerFactory");
const { analyzePR } = require("../services/llmService");
const { buildPrompt } = require("../utils/promptBuilder");
const { validateReviewInput } = require("../utils/validator");
const { cleanLLMResponse } = require("../utils/formatter");
const { safeParseJSON } = require("../utils/jsonParser");
const { chunkText } = require("../utils/chunker");
const { logInfo, logError } = require("../utils/logger");
const pCap = require("p-cap");
const { filterInsights } = require("../utils/filter");
const { applySeverity } = require("../utils/severity");
const { formatComment } = require("../utils/formatComment");


const limit = pCap(3); // max 3 LLM calls at once

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
      return { success: false, error: "PR diff is empty or invalid" };
    }

    const chunks = chunkText(diff);

    const promises = chunks.map((chunk) =>
      limit.run(
        async (c) => {
          try {
            const prompt = buildPrompt(c);
            const raw = await analyzePR(prompt);
            const cleaned = cleanLLMResponse(raw);
            const parsed = safeParseJSON(cleaned);
            if (!parsed) {
              logError("Invalid JSON from LLM", cleaned);
              return null;
            }
            return parsed;
          } catch (err) {
            logError("Chunk failed", err);
            return null;
          }
        },
        { timeout: 10000 }, // built-in per-task timeout
        chunk               // passed as arg `c` above
      )
    );

    const results = (await Promise.all(promises)).filter(Boolean);

    // Merge all chunk outputs
    let merged = mergeResults(results);

    // Normalize / enforce severity
    merged = applySeverity(merged);

    // Remove generic / useless insights
    merged = filterInsights(merged);

    const comment = formatComment(merged);

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
    edge_cases: [],
  };
  for (const res of results) {
    for (const key in merged) {
      merged[key].push(...(res[key] || []));
    }
  }
  return merged;
}

module.exports = { runReviewAgent };