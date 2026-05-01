const axios = require("axios");

const BASE_URL = "https://api.github.com";

async function getPRDiff(owner, repo, prNumber) {
  const response = await axios.get(
    `${BASE_URL}/repos/${owner}/${repo}/pulls/${prNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.diff"
      }
    }
  );

  return response.data;
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