import { MakeFetchNearbyOrgsService } from "@/services/factories/make-fetch-nearby-orgs-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function NearbyOrgs(
  request: FastifyRequest,
  response: FastifyReply
) {
  const NearbyOrgsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { latitude, longitude } = NearbyOrgsBodySchema.parse(request.query);

  const fetchNearbyOrgsService = MakeFetchNearbyOrgsService();

  const orgs = await fetchNearbyOrgsService.execute({
    orgsLatitude: latitude,
    orgsLongitude: longitude
  });

  return response.status(200).send({ ...orgs });
}
