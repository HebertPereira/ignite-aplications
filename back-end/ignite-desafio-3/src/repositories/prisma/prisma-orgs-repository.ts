import { Org, Prisma } from "@prisma/client";

import { FindManyNearbyParams, OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data });

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id: id
      }
    });

    return org;
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email: email
      }
    });

    return org;
  }

  async findManyNearby({
    latitude,
    longitude
  }: FindManyNearbyParams): Promise<Org[]> {
    const gyms = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `;

    return gyms;
  }
}
