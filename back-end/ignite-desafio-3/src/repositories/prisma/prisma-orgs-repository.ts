import { Org, Prisma } from "@prisma/client";

import { FindManyNearbyParams, OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data });

    return org;
  }

  findById(id: string): Promise<Org | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Org | null> {
    throw new Error("Method not implemented.");
  }
  findManyNearby(params: FindManyNearbyParams): Promise<Org[]> {
    throw new Error("Method not implemented.");
  }
}
