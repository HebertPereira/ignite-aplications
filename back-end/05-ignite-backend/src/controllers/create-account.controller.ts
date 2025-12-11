import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "@/pipes/zod-validation";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const createAccountBodySchema = z.object({
  name: z.string().min(6),
  email: z.email(),
  password: z.string().min(8)
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const userWiyhSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userWiyhSameEmail) {
      throw new ConflictException(
        "User with the same e-mail address already exists!"
      );
    }

    const hashPassword = await hash(password, 8);

    return this.prisma.user.create({
      data: { name, email, password: hashPassword }
    });
  }
}
