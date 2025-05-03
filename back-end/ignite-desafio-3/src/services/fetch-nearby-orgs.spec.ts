import { describe, it, expect } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { FetchNearbyOrgsService } from "./fetch-nearby-orgs";

let orgsRepository: InMemoryOrgsRepository;
let sut: FetchNearbyOrgsService;

describe("Create Org Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchNearbyOrgsService(orgsRepository);
  });

  it("should be able to fetch orgs on specified location", async () => {
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

    await orgsRepository.create(orgData);
    await orgsRepository.create(orgData);

    // Create an org in another location
    await orgsRepository.create({
      ...orgData,
      latitude: -31.1089633,
      longitude: -31.1089633
    });

    const { orgs } = await sut.execute({
      orgsLatitude: orgData.latitude,
      orgsLongitude: orgData.longitude
    });

    expect(orgs).toHaveLength(2);
  });
});
