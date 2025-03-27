import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkinsRepository: CheckInsRespository) {}

  async execute({
    userId,
    gymId
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId
    });

    return {
      checkIn
    };
  }
}
