import { describe, it, expect } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { CreateOrgService } from "./create-org";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgService;

describe("Create Org Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgService(orgsRepository);
  });

  it("should be able to register a pet on a especific org", async () => {
    const orgData = {
      name: "Salve patinhas",
      author_name: "Julio Verne",
      email: "juliodescobrecterra@hotmail.com",
      whatsapp: "+55 61 94002-8922",
      password: "sakldjklasjd",
      cep: "30979-825",
      state: "Maranhão",
      city: "Blumenau",
      neighborhood: "Asc SA",
      street: "Rua paratinga",
      latitude: -31.3589621,
      longitude: -31.3589621
    };

    const { org } = await sut.execute(orgData);

    expect(org.id).toEqual(expect.any(String));
  });
});
