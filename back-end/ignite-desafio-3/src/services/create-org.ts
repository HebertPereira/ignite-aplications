import { randomUUID } from "node:crypto";
import { Org } from "@prisma/client";

import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateOrgServiceRequest {
  id?: string; // Usually used for test
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface CreateOrgServiceResponse {
  org: Org;
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    id,
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
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (userWithSameEmail?.id) {
      throw new UserAlreadyExistsError();
    } else {
      const newPassword = await hash(password, 6);

      const org = await this.orgsRepository.create({
        id: id ?? randomUUID(),
        name,
        author_name,
        email,
        whatsapp,
        password: newPassword,
        cep,
        state,
        city,
        neighborhood,
        street,
        latitude,
        longitude
      });

      return { org };
    }
  }
}
