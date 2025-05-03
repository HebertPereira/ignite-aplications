import { describe, it, expect } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgContactService } from "./org-contacts";

let orgsRepository: InMemoryOrgsRepository;
let sut: OrgContactService;

describe("Org Contact Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new OrgContactService(orgsRepository);
  });

  it("should be able to get the contact of an especific org", async () => {
    const orgData = {
      id: "org1",
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

    await orgsRepository.create(orgData);

    const org = await sut.execute({ id: "org1" });

    expect(org.whatsapp).toEqual(expect.any(String));
  });
});
