import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { OrgContactService } from "../org-contacts";

export function MakeOrgContactService() {
  const orgsRepository = new PrismaOrgsRepository();
  const service = new OrgContactService(orgsRepository);

  return service;
}
