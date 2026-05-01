const { getProvider } = require("../providers/providerFactory");
const { analyzePR } = require("../services/llmService");
const { buildPrompt } = require("../utils/promptBuilder");

async function runReviewAgent({ providerType, owner, repo, prNumber }) {
  const provider = getProvider(providerType);

  const diff = await provider.getPRDiff(owner, repo, prNumber);

  const prompt = buildPrompt(diff);

  const analysis = await analyzePR(prompt);

  const comment = `## 🤖 AI Review\n\n\`\`\`json\n${analysis}\n\`\`\``;

  await provider.postComment(owner, repo, prNumber, comment);
}

module.exports = { runReviewAgent };