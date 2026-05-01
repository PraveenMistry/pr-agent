function cleanLLMResponse(response) {
  return response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

module.exports = { cleanLLMResponse };