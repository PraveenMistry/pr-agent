function buildPrompt(diff) {
  if (!diff || typeof diff !== "string" || diff.trim().length === 0) {
    throw new Error("Invalid diff provided to prompt builder");
  }

  return `
    You are a senior backend engineer with 10+ years experience in Node.js, MongoDB, and scalable systems.

    Analyze the following PR diff and provide:

    1. Bugs or logical issues
    2. Performance issues
    3. Code quality improvements
    4. MongoDB index suggestions
    5. Edge cases

    Return ONLY valid JSON. No markdown.

    {
      "bugs": [],
      "performance_issues": [],
      "improvements": [],
      "index_suggestions": [],
      "edge_cases": []
    }

    PR Diff:
    ${diff}
  `;
}

module.exports = { buildPrompt };