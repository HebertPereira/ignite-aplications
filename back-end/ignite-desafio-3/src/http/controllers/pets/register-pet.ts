import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MakeRegisterPetService } from "@/services/factories/make-register-pet-service";

export async function RegisterPet(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.enum(["small", "medium", "large"]),
    energy_level: z.enum(["low", "moderate", "high"]),
    environment: z.enum(["indoor", "outdoor"]),
    org_id: z.string()
  });

  const { name, about, age, size, energy_level, environment, org_id } =
    registerPetBodySchema.parse(request.body);

  const registerPet = MakeRegisterPetService();

  const { pet } = await registerPet.execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id
  });

  return response.status(201).send({ pet });
}
