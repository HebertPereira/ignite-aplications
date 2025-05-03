import { InvalidCredentialError } from "@/services/errors/Invalid-credentials-error";
import { MakeAuthenticateOrgService } from "@/services/factories/make-authenticate-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function AuthenticateOrg(
  request: FastifyRequest,
  response: FastifyReply
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  });

  const { email, password } = authenticateOrgBodySchema.parse(request.body);
  try {
    const createOrgService = MakeAuthenticateOrgService();

    const { org } = await createOrgService.execute({
      email,
      password
    });

    const token = await response.jwtSign({
      sign: {
        sub: org?.id
      }
    });

    const refreshToken = await response.jwtSign({
      sign: {
        sub: org?.id,
        expiresIn: "7d"
      }
    });

    return response
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ token, sub: org?.id });
  } catch (err: unknown) {
    if (err instanceof InvalidCredentialError) {
      return response.status(400).send({ message: err.message });
    }
    throw err;
  }
}
