class HttpError extends Error {
  constructor(code, message) {
    super(code, message);
    this.code = code,
    this.message = message;
  }
}

module.exports = HttpError;
