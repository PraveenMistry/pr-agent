function buildPrompt(diff) {
  return `
You are a senior backend engineer with 10+ years experience in Node.js, MongoDB, and scalable systems.

Analyze the following PR diff and provide:

1. Bugs or logical issues
2. Performance issues
3. Code quality improvements (SOLID, clean code)
4. MongoDB index suggestions (VERY IMPORTANT)
5. Edge cases missing

Return response in JSON format:

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