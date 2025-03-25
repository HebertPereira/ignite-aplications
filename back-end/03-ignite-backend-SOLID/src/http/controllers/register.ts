import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistesError } from "@/services/errors/user-already-exists-error";
import { RegisterService } from "@/services/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodyShcema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password } = registerBodyShcema.parse(request.body);

  try {
    const usersRepository = new PrismaUserRepository();
    const registerService = new RegisterService(usersRepository);
    await registerService.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistesError) {
      return response.status(409).send({ message: err.message });
    }
    throw err;
  }

  return response.status(201).send();
}
