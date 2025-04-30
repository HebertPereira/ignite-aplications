import { describe, it, expect } from "vitest";

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { PetDetailsService } from "./pet-details";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: PetDetailsService;

describe("Pet Details Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new PetDetailsService(petsRepository);
  });

  it("should be able to find a pet on a especific id", async () => {
    // Step 1 - Create Orgs
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

    // Step 2 - Register pet
    const petData = {
      id: "pet1",
      name: "Antonis",
      about: "Caramelo",
      age: "2",
      size: "medium",
      energy_level: "moderate",
      environment: "outdoor",
      org_id: orgData.id
    };
    await petsRepository.create(petData);
    await petsRepository.create({ ...petData, id: "pet2" });

    const { pet } = await sut.execute({ id: "pet1" });

    expect(pet?.id).toEqual("pet1");
  });
});
