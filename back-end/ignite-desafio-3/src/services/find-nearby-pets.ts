import { Pet } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";

interface FindNearbyPetsServiceRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
  org_id?: string;
}

interface FindNearbyPetsServiceResponse {
  pets: Pet[];
}

export class FindNearbyPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment
  }: FindNearbyPetsServiceRequest): Promise<FindNearbyPetsServiceResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment
    });

    return { pets };
  }
}
