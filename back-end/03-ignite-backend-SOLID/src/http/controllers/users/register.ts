import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";
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
    const registerService = makeRegisterService();

    await registerService.execute({ name, email, password });
  } catch (err: unknown) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: err.message });
    }
    throw err;
  }

  return response.status(201).send();
}
