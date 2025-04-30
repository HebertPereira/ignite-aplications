import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetService } from "../register-pet";

export function MakeRegisterPetService() {
  const petsRepository = new PrismaPetsRepository();
  const service = new RegisterPetService(petsRepository);

  return service;
}
