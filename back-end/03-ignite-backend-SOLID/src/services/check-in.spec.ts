import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInService } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { GymsRepository } from "@/repositories/gym-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: GymsRepository;
let sut: CheckInService;

describe("Check-in Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    vi.useFakeTimers();

    await gymsRepository.create({
      id: "gym-01",
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -31.9399458,
      longitude: -56.115245
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const userData = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.9399458,
      userLongitude: -56.115245
    };

    const { checkIn } = await sut.execute(userData);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    const userData = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.9399458,
      userLongitude: -56.115245
    };

    await sut.execute(userData);

    await expect(() => sut.execute(userData)).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    const userData = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -31.9399458,
      userLongitude: -56.115245
    };

    await sut.execute(userData);

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute(userData);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on ditant gym", async () => {
    await gymsRepository.create({
      id: "gym-01",
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -31.894723,
      longitude: -56.244091
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -31.9399458,
        userLongitude: -49.115245
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
