import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchNearbyOrgsService } from "../fetch-nearby-orgs";

export function MakeFetchNearbyOrgsService() {
  const orgsRepository = new PrismaOrgsRepository();
  const service = new FetchNearbyOrgsService(orgsRepository);

  return service;
}
