import { ValidateCheckInService } from "../validate-check-ins";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInService(checkInsRepository);

  return service;
}
