const GitProvider = require("./gitProvider");
const axios = require("axios");

class BitbucketProvider extends GitProvider {
  async getPRDiff(workspace, repo, prNumber) {
    const res = await axios.get(
      `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo}/pullrequests/${prNumber}/diff`,
      {
        auth: {
          username: process.env.BITBUCKET_USERNAME,
          password: process.env.BITBUCKET_APP_PASSWORD
        }
      }
    );
    return res.data;
  }

  async postComment(workspace, repo, prNumber, comment) {
    await axios.post(
      `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo}/pullrequests/${prNumber}/comments`,
      { content: { raw: comment } },
      {
        auth: {
          username: process.env.BITBUCKET_USERNAME,
          password: process.env.BITBUCKET_APP_PASSWORD
        }
      }
    );
  }
}

module.exports = BitbucketProvider;