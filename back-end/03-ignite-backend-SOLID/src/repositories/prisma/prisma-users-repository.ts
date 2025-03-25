import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { usersRepository } from "../users-repository";

export class PrismaUserRepository implements usersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    return user;
  }
}
