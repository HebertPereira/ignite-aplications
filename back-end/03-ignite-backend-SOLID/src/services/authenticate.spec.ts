import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });
  it("should be able to authenticate", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6)
    };

    await usersRepository.create(userData);

    const { user } = await sut.execute({
      email: userData.email,
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6)
    };

    await usersRepository.create(userData);

    await expect(() =>
      sut.execute({
        email: userData.email,
        password: "123123"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
