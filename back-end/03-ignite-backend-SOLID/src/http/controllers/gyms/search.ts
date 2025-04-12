import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";

export async function search(request: FastifyRequest, response: FastifyReply) {
  const searchGymQueryShcema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const { query, page } = searchGymQueryShcema.parse(request.query);

  const searchGymService = makeSearchGymsService();

  const { gyms } = await searchGymService.execute({
    query,
    page
  });

  return response.status(200).send({
    gyms
  });
}
