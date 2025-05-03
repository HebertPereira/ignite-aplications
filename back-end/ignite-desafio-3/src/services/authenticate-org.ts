import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCredentialError } from "./errors/Invalid-credentials-error";

interface AuthenticateOrgServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgServiceResponse {
  org: Org | null;
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    email,
    password
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (org && (await compare(password, org?.password))) {
      return { org };
    } else {
      throw new InvalidCredentialError();
    }
  }
}
