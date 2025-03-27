import { AuthenticateService } from "../authenticate";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUserRepository();
  const autenticateService = new AuthenticateService(usersRepository);

  return autenticateService;
}
