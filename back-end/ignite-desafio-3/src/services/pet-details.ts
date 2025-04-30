import { Pet } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";

interface PetDetailsServiceResponse {
  pet: Pet | null;
}

interface PetDetailsServiceRequest {
  id: string;
}

export class PetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id
  }: PetDetailsServiceRequest): Promise<PetDetailsServiceResponse> {
    const pet = await this.petsRepository.findById(id);

    return { pet };
  }
}
