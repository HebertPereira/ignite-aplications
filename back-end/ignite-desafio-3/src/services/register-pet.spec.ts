import { describe, it, expect } from "vitest";

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { RegisterPetService } from "./register-pet";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: RegisterPetService;

describe("Register Pet Service", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new RegisterPetService(petsRepository);
  });

  it("should be able to register a pet on a especific org", async () => {
    const petData = {
      name: "Antonis",
      about: "Caramelo",
      age: "2",
      size: "medium",
      energy_level: "medium",
      environment: "outdoor",
      org_id: "23423fwer3"
    };

    const { pet } = await sut.execute(petData);

    expect(pet.id).toEqual(expect.any(String));
  });
});
