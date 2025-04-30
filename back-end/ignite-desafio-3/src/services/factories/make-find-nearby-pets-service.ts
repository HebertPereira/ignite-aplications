import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FindNearbyPetsService } from "../find-nearby-pets";

export function MakeFindNearbyPetsService() {
  const petsRepository = new PrismaPetsRepository();
  const service = new FindNearbyPetsService(petsRepository);

  return service;
}
