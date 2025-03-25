export class UserAlreadyExistesError extends Error {
  constructor() {
    super("User with same email already exists");
    this.name = "UserAlreadyExistesError";
  }
}
