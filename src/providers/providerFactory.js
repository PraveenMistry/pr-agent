const GitHubProvider = require("./githubProvider");
const BitbucketProvider = require("./bitbucketProvider");

function getProvider(type) {
  switch (type) {
    case "github":
      return new GitHubProvider();
    case "bitbucket":
      return new BitbucketProvider();
    default:
      return {
        error: `Unsupported provider: ${type}. Supported: github, bitbucket`
      };
  }
}

module.exports = { getProvider };