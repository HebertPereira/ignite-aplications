import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCredentialError } from "./errors/Invalid-credentials-error";

interface OrgContactServiceRequest {
  id: string;
}

interface OrgContactServiceResponse {
  cep: string;
  city: string;
  street: string;
  whatsapp: string;
}

export class OrgContactService {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    id
  }: OrgContactServiceRequest): Promise<OrgContactServiceResponse> {
    const org = await this.orgsRepository.findById(id);

    if (org) {
      return {
        cep: org.cep,
        city: org.city,
        street: org.street,
        whatsapp: org.whatsapp
      };
    } else {
      throw new InvalidCredentialError();
    }
  }
}
