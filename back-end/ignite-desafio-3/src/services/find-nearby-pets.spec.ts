import { describe, it, expect } from "vitest";

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { FindNearbyPetsService } from "./find-nearby-pets";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut1: FindNearbyPetsService;

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

const petData = {
  name: "Antonis",
  about: "Caramelo",
  age: "2",
  size: "medium",
  energy_level: "moderate",
  environment: "outdoor",
  org_id: orgData.id
};

describe("Find Nearby Pets Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut1 = new FindNearbyPetsService(petsRepository);
  });

  it("should be able to search pets by city", async () => {
    // Step 1 - Create Orgs

    await orgsRepository.create(orgData);
    await orgsRepository.create({ ...orgData, id: "org2", city: "Barueri" });

    // Step 2 - Register pet
    await petsRepository.create(petData);
    await petsRepository.create(petData);

    // Create pet in another org
    await petsRepository.create({ ...petData, org_id: "org2" });

    // Step 3 - Find Pet
    const { pets } = await sut1.execute({
      city: orgData.city
    });

    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut1.execute({
      city: "Barueri"
    });

    expect(pets2).toHaveLength(1);
  });

  it("should be able to search pets by city and age", async () => {
    // Step 1 - Create Orgs
    await orgsRepository.create(orgData);

    // Step 2 - Register pet
    await petsRepository.create(petData);

    // Create pet in another age
    await petsRepository.create({ ...petData, age: "1" });

    // Step 3 - Find Pet
    const { pets } = await sut1.execute({
      city: orgData.city,
      age: "2"
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
    // Step 1 - Create Orgs
    await orgsRepository.create(orgData);

    // Step 2 - Register pet
    await petsRepository.create({ ...petData, size: "low" });
    await petsRepository.create({ ...petData, size: "medium" });
    await petsRepository.create({ ...petData, size: "high" });

    // Step 3 - Find Pet
    const { pets } = await sut1.execute({
      city: orgData.city,
      size: "medium"
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy_level", async () => {
    // Step 1 - Create Orgs
    await orgsRepository.create(orgData);

    // Step 2 - Register pet
    await petsRepository.create({ ...petData, energy_level: "low" });
    await petsRepository.create({ ...petData, energy_level: "medium" });
    await petsRepository.create({ ...petData, energy_level: "high" });

    // Step 3 - Find Pet
    const { pets } = await sut1.execute({
      city: orgData.city,
      energy_level: "medium"
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
    // Step 1 - Create Orgs
    await orgsRepository.create(orgData);

    // Step 2 - Register pet
    await petsRepository.create({ ...petData, environment: "indoor" });
    await petsRepository.create({ ...petData, environment: "outdoor" });

    // Step 3 - Find Pet
    const { pets } = await sut1.execute({
      city: orgData.city,
      environment: "indoor"
    });

    expect(pets).toHaveLength(1);
  });
});
