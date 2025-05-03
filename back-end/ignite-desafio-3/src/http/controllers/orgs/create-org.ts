import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MakeCreateOrgService } from "@/services/factories/make-create-org-service";

export async function CreateOrg(
  request: FastifyRequest,
  response: FastifyReply
) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string().min(8).max(9),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const {
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude
  } = createOrgBodySchema.parse(request.body);

  const createOrgsService = MakeCreateOrgService();

  const { org } = await createOrgsService.execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude
  });

  return response.status(201).send({ org });
}
