const VALID_SEVERITY = ["Critical", "High", "Medium", "Low"];

function normalizeSeverity(item) {
  if (!item.severity || !VALID_SEVERITY.includes(item.severity)) {
    item.severity = "Medium";
  }
  return item;
}

function applySeverity(data) {
  const keys = ["bugs", "performance_issues", "improvements", "edge_cases"];

  for (const key of keys) {
    data[key] = (data[key] || []).map(normalizeSeverity);
  }

  return data;
}

module.exports = { applySeverity };