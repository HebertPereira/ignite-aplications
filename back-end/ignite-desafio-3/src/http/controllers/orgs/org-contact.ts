import { MakeOrgContactService } from "@/services/factories/make-org-contact-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function OrgContact(
  request: FastifyRequest,
  response: FastifyReply
) {
  const orgContactParamsSchema = z.object({
    id: z.string()
  });

  const { id } = orgContactParamsSchema.parse(request.params);

  const orgContactService = MakeOrgContactService();

  const orgContacts = await orgContactService.execute({ id });

  return response.status(200).send(orgContacts);
}
