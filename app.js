require("dotenv").config();
const express = require("express");
const { runReviewAgent } = require("./src/agent/reviewAgent");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.post("/review", async (req, res) => {
  try {
    console.log("Incoming request:", req.body);

    const result = await runReviewAgent(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({ message: "Review completed" });
  } catch (err) {
    console.error("Route Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong"
  });
});


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));
