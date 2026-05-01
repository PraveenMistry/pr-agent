const axios = require("axios");
const { retry } = require("../utils/retry");

async function analyzePR(prompt) {
  try {
    const response = await retry(() =>
      axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: process.env.LLM_MODEL,
          messages: [
            {
              role: "system",
              content: process.env.SYSTEM_PROMPT
            },
            {
              role: "user",
              content: prompt
            }
          ]
        },
        {
          timeout: 10000, // (10 sec)
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      )
    );

    const content = response.data?.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty LLM response");

    return content;

  } catch (err) {
    console.error("LLM ERROR:", err.message);
    throw new Error("LLM call failed");
  }
}

module.exports = { analyzePR };