import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeValidateCheckInService } from "@/services/factories/make-validate-check-ins-service";

export async function validate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const createCheckInParamsShcema = z.object({
    checkInId: z.string().uuid()
  });

  const { checkInId } = createCheckInParamsShcema.parse(request.body);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({
    checkInId
  });

  return response.status(204).send();
}
