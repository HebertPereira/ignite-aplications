import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";

interface RegisterPetServiceResponse {
  pet: Pet;
}

interface RegisterPetServiceRequest {
  id?: string; // Usually used for test
  name: string;
  about: string;
  age: string;
  size: string;
  energy_level: string;
  environment: string;
  org_id: string;
}

export class RegisterPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id
  }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
    const pet = await this.petsRepository.create({
      id: id ?? randomUUID(),
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id
    });

    return { pet };
  }
}
