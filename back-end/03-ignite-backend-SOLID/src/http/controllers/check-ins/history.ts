import { makeFetchUserCheckInHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, response: FastifyReply) {
  const checkInHistoryQueryShcema = z.object({
    page: z.coerce.number().min(1).default(1)
  });

  const { page } = checkInHistoryQueryShcema.parse(request.query);

  const fetchHistoryCheckInsService = makeFetchUserCheckInHistoryService();

  const { checkIns } = await fetchHistoryCheckInsService.execute({
    userId: request.user.sub,
    page
  });

  return response.status(200).send({
    checkIns
  });
}
