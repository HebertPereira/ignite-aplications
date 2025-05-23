import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateGymService } from "@/services/factories/make-create-gym-service";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createGymBodyShcema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodyShcema.parse(request.body);

  const createGymService = makeCreateGymService();

  await createGymService.execute({
    title,
    description,
    phone,
    latitude,
    longitude
  });

  return response.status(201).send();
}
