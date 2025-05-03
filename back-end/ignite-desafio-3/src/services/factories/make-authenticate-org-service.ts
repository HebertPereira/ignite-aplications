import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgService } from "../authenticate-org";

export function MakeAuthenticateOrgService() {
  const orgsService = new PrismaOrgsRepository();
  const service = new AuthenticateOrgService(orgsService);

  return service;
}
