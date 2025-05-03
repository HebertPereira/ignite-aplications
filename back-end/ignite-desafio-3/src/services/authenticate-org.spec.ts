import { describe, it, expect } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateOrgService } from "./authenticate-org";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "./errors/Invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgService;

describe("Authenticate Org Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgService(orgsRepository);
  });

  const orgData = {
    name: "Salve patinhas",
    author_name: "Julio Verne",
    email: "juliodescobrecterra@hotmail.com",
    whatsapp: "+55 61 94002-8922",
    password: await hash("hippopotamo", 6),
    cep: "30979-825",
    state: "Maranhão",
    city: "Blumenau",
    neighborhood: "Asc SA",
    street: "Rua paratinga",
    latitude: -31.3589621,
    longitude: -31.3589621
  };

  it("should be able to authenticate an org", async () => {
    await orgsRepository.create(orgData);

    const { org } = await sut.execute({
      email: orgData.email,
      password: "hippopotamo"
    });

    expect(org?.id).toEqual(expect.any(String));
  });

  it("should be able to deny an org with wrong password to authenticate", async () => {
    await orgsRepository.create(orgData);

    await expect(
      sut.execute({
        email: orgData.email,
        password: "epíteto"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
