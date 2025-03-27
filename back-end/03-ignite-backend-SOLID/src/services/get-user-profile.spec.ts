import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6)
    };

    const createUser = await usersRepository.create(userData);

    const { user } = await sut.execute({
      id: createUser.id
    });

    expect(user.name).toEqual(userData.name);
  });

  it("should not be able to get user profile with wrong email", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
