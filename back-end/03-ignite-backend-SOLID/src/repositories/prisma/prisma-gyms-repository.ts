import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gym-repository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findFirst({
      where: {
        id
      }
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        title: { contains: query }
      },
      take: 20,
      skip: (page - 1) * 20
    });

    return gym;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data
    });

    return gym;
  }
}
