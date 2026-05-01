const GitHubProvider = require("./githubProvider");
const BitbucketProvider = require("./bitbucketProvider");

function getProvider(type) {
  switch (type) {
    case "github":
      return new GitHubProvider();
    case "bitbucket":
      return new BitbucketProvider();
    default:
      throw new Error("Unsupported provider");
  }
}

module.exports = { getProvider };