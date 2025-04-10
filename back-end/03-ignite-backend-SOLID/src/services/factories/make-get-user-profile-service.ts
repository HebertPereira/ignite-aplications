import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserProfileService } from "../get-user-profile";

export function makeGetUserProfileService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new GetUserProfileService(checkInsRepository);

  return service;
}
