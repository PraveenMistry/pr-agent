const axios = require("axios");
const { retry } = require("../utils/retry");
const secret = require("../config/secret");

class GitHubProvider {
  async getPRDiff(owner, repo, prNumber) {
    const res = await retry(() =>
      axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
        {
          headers: {
            Authorization: `Bearer ${secret.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.diff"
          }
        }
      )
    );

    if (!res.data) throw new Error("Empty diff");

    return res.data;
  }

  async postComment(owner, repo, prNumber, comment) {
    await retry(() =>
      axios.post(
        `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${secret.GITHUB_TOKEN}`
          }
        }
      )
    );
  }
}

module.exports = GitHubProvider;