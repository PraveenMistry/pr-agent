function validateReviewInput({ providerType, owner, repo, prNumber }) {
  if (!providerType) return "providerType required";
  if (!owner) return "owner/workspace required";
  if (!repo) return "repo required";
  if (!prNumber || isNaN(prNumber)) return "valid prNumber required";
  return null;
}

module.exports = { validateReviewInput };