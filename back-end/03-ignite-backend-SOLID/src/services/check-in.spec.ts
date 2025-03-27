import { beforeEach, describe, expect, it } from "vitest";
import { CheckInService } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe("Check-in Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInsRepository);
  });
  it("should be able to check in", async () => {
    const userData = {
      gymId: "gym-01",
      userId: "user-01"
    };

    const { checkIn } = await sut.execute(userData);

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
