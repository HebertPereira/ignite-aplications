import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MakePetDetailsService } from "@/services/factories/make-pet-details-service";

export async function PetDetails(
  request: FastifyRequest,
  response: FastifyReply
) {
  const petDetailsBodySchema = z.object({
    id: z.string()
  });

  const { id } = petDetailsBodySchema.parse(request.params);

  const petDetails = MakePetDetailsService();

  const { pet } = await petDetails.execute({
    id
  });

  return response.status(200).send({ pet });
}
