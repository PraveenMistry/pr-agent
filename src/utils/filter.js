const GENERIC_PATTERNS = [
  "improve code quality",
  "consider optimization",
  "better readability",
  "refactor code",
  "follow best practices"
];

function isGeneric(text) {
  if (!text) return true;

  const lower = text.toLowerCase();

  return GENERIC_PATTERNS.some(pattern =>
    lower.includes(pattern)
  );
}

function filterInsights(data) {
  const keys = ["bugs", "performance_issues", "improvements", "edge_cases"];

  for (const key of keys) {
    data[key] = (data[key] || []).filter(item => {
      return !isGeneric(item.issue);
    });
  }

  return data;
}

module.exports = { filterInsights };