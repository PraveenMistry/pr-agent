class GitProvider {
  async getPRDiff(owner, repo, prNumber) {
    throw new Error("Not implemented");
  }

  async postComment(owner, repo, prNumber, comment) {
    throw new Error("Not implemented");
  }
}

module.exports = GitProvider;