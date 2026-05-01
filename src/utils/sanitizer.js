function sanitizeOutput(text) {
  if (!text) return "";

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/<script.*?>.*?<\/script>/gi, "") // basic XSS guard
    .trim();
}

module.exports = { sanitizeOutput };