import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service";

export async function nearby(request: FastifyRequest, response: FastifyReply) {
  const nearbyGymQueryShcema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { latitude, longitude } = nearbyGymQueryShcema.parse(request.query);

  const fetchNearbyGymService = makeFetchNearbyGymsService();

  const { gyms } = await fetchNearbyGymService.execute({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return response.status(200).send({ gyms });
}
