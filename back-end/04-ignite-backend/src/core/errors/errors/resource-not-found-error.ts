import { UseCaseError } from "@/core/errors/use-case-errors";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Resource not found!");
    this.name = "Resource not found!";
  }
}
