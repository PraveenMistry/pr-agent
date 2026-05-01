const axios = require("axios");
const { retry } = require("../utils/retry");
const secret = require("../config/secret");

class BitbucketProvider {
  async getPRDiff(workspace, repo, prNumber) {
    const res = await retry(() =>
      axios.get(
        `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo}/pullrequests/${prNumber}/diff`,
        {
          auth: {
            username: secret.BITBUCKET_USERNAME,
            password: secret.BITBUCKET_APP_PASSWORD
          }
        }
      )
    );

    if (!res.data) throw new Error("Empty diff");

    return res.data;
  }

  async postComment(workspace, repo, prNumber, comment) {
    await retry(() =>
      axios.post(
        `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo}/pullrequests/${prNumber}/comments`,
        { content: { raw: comment } },
        {
          auth: {
            username: secret.BITBUCKET_USERNAME,
            password: secret.BITBUCKET_APP_PASSWORD
          }
        }
      )
    );
  }
}

module.exports = BitbucketProvider;