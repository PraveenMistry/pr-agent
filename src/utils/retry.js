async function retry(fn, retries = 3, delay = 500) {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;

    const backoff = delay * Math.pow(2, 3 - retries); // exponential

    await new Promise(res => setTimeout(res, backoff));

    return retry(fn, retries - 1, delay);
  }
}

module.exports = { retry };