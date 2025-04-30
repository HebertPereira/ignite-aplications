import { randomUUID } from "node:crypto";
import { Org } from "@prisma/client";

import { OrgsRepository } from "@/repositories/orgs-repository";

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
    const org = await this.orgsRepository.create({
      id: id ?? randomUUID(),
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
    });

    return { org };
  }
}
