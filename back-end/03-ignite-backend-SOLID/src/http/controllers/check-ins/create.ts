import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCheckInService } from "@/services/factories/make-check-in-service";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createCheckInParamsShcema = z.object({
    gymId: z.string().uuid()
  });

  const createCheckInBodyShcema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { gymId } = createCheckInParamsShcema.parse(request.params);
  const { latitude, longitude } = createCheckInBodyShcema.parse(request.body);

  const createCheckInService = makeCheckInService();

  await createCheckInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });

  return response.status(201).send();
}
