import { CheckIn } from "@prisma/client";

import { CheckInsRespository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryServiceRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryService {
  constructor(private checkInsRepository: CheckInsRespository) {}

  async execute({
    userId,
    page
  }: FetchUserCheckInHistoryServiceRequest): Promise<FetchUserCheckInHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns
    };
  }
}
