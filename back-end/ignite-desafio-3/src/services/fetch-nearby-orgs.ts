import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface FetchNearbyOrgsServiceRequest {
  orgsLatitude: number;
  orgsLongitude: number;
}

interface FetchNearbyOrgsServiceResponse {
  orgs: Org[] | null;
}

export class FetchNearbyOrgsService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgsLatitude,
    orgsLongitude
  }: FetchNearbyOrgsServiceRequest): Promise<FetchNearbyOrgsServiceResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: orgsLatitude,
      longitude: orgsLongitude
    });

    return { orgs };
  }
}
