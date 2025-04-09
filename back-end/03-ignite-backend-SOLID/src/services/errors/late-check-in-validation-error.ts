export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      "The Check-in can only be validates until 20 minutes of its creation"
    );
    this.name = "LateCheckInValidationError";
  }
}
