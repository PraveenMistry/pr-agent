require("dotenv").config();
const express = require("express");
const { runReviewAgent } = require("./src/agent/reviewAgent");

const app = express();
app.use(express.json());

app.post("/review", async (req, res) => {
  const { owner, repo, prNumber } = req.body;

  await runReviewAgent({ owner, repo, prNumber });

  res.send("Review triggered");
});

app.listen(3000, () => {
  console.log("🚀 PR Agent running on port 3000");
});
