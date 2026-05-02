function buildPrompt(diff) {
  if (!diff || typeof diff !== "string") {
    throw new Error("Invalid diff");
  }

  return `
    You are a senior backend engineer (10+ years experience).

    Analyze the PR diff and provide ONLY meaningful, actionable insights.

    STRICT RULES:
    - DO NOT give generic advice (e.g., "improve code quality")
    - ONLY report real issues with clear reasoning
    - If no issue exists, return empty arrays
    - Be concise and specific

    For each issue:
    - Assign severity: Critical / High / Medium / Low
    - Explain WHY it is a problem
    - Suggest a concrete fix

    Return STRICT JSON (no markdown):

    {
      "bugs": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "",
          "reason": "",
          "suggestion": ""
        }
      ],
      "performance_issues": [],
      "improvements": [],
      "edge_cases": []
    }

    PR Diff:
    ${diff}
  `;
}

module.exports = { buildPrompt };