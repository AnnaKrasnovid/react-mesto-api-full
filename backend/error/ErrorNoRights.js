class ErrorNoRights extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 403;
  }
}

module.exports = ErrorNoRights;
