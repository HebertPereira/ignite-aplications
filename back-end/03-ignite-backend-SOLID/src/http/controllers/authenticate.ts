import { InvalidCredentialError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const authenticateBodyShcema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = authenticateBodyShcema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();
    const { user } = await authenticateService.execute({ email, password });

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id
        }
      }
    );

    return response.status(200).send({ token });
  } catch (err: unknown) {
    if (err instanceof InvalidCredentialError) {
      return response.status(400).send({ message: err.message });
    }
    throw err;
  }
}
