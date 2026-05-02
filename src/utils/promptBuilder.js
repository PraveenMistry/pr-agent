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

/*

Domain Intelligence

function buildPrompt(diff) {
  if (!diff || typeof diff !== "string") {
    throw new Error("Invalid diff");
  }

  return `
You are a senior backend engineer specializing in Node.js and MongoDB systems.

Analyze the PR diff and ONLY report meaningful issues.

Focus on these patterns:

🔴 CRITICAL:
- N+1 queries (DB calls inside loops)
- Missing indexes on frequently queried fields
- Blocking operations in async flows
- Unhandled promise rejections
- Missing error handling in APIs

🟠 HIGH:
- Inefficient MongoDB queries
- Unnecessary DB calls
- Poor async/await usage
- Lack of pagination in queries

🟡 MEDIUM:
- Code structure issues
- Logging missing
- Validation missing

STRICT RULES:
- NO generic suggestions
- ONLY real issues with reasoning
- Provide actionable fixes

Return STRICT JSON:

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

*/

module.exports = { buildPrompt };