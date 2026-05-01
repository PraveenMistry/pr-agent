function logInfo(message, meta = {}) {
  console.log(JSON.stringify({ level: "INFO", message, ...meta }));
}

function logError(message, error) {
  console.error(JSON.stringify({ level: "ERROR", message, error: error.message }));
}

module.exports = { logInfo, logError };