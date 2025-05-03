import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MakeFindNearbyPetsService } from "@/services/factories/make-find-nearby-pets-service";

export async function FindNearbyPets(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerPetBodySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.enum(["small", "medium", "large"]).optional(),
    energy_level: z.enum(["low", "moderate", "high"]).optional(),
    environment: z.enum(["indoor", "outdoor"]).optional()
  });

  const { city, age, size, energy_level, environment } =
    registerPetBodySchema.parse(request.query);

  const findNearbyPets = MakeFindNearbyPetsService();

  const { pets } = await findNearbyPets.execute({
    city,
    age,
    size,
    energy_level,
    environment
  });

  return response.status(200).send({ pets });
}
