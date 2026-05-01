const GitProvider = require("./gitProvider");
const axios = require("axios");

class GitHubProvider extends GitProvider {
  async getPRDiff(owner, repo, prNumber) {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.diff"
        }
      }
    );
    return res.data;
  }

  async postComment(owner, repo, prNumber, comment) {
    await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
      { body: comment },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    );
  }
}

module.exports = GitHubProvider;