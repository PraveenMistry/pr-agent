const axios = require("axios");

const BASE_URL = "https://api.github.com";

async getPRDiff(owner, repo, prNumber) {
  try {
    const res = await retry(() =>
      axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
        {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.diff"
          }
        }
      )
    );

    if (!res.data || typeof res.data !== "string") {
      throw new Error("Invalid diff response");
    }

    return res.data;

  } catch (err) {
    throw new Error(`GitHub diff error: ${err.message}`);
  }
}

async function postComment(owner, repo, prNumber, comment) {
  await axios.post(
    `${BASE_URL}/repos/${owner}/${repo}/issues/${prNumber}/comments`,
    { body: comment },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  );
}

module.exports = { getPRDiff, postComment };