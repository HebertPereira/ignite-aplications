import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetDetailsService } from "../pet-details";

export function MakePetDetailsService() {
  const petsRepository = new PrismaPetsRepository();
  const service = new PetDetailsService(petsRepository);

  return service;
}
