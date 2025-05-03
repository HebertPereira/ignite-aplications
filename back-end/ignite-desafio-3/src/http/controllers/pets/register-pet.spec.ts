import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-user";

describe("Pet Details (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able catch pet details", async () => {
    const { token, sub } = await createAndAuthenticateOrg(app);

    const petData = {
      name: "Antonis",
      about: "Caramelo",
      age: "2",
      size: "medium",
      energy_level: "moderate",
      environment: "outdoor",
      org_id: sub
    };

    const response = await request(app.server)
      .post("/pets/register")
      .set("Authorization", `Bearer ${token}`)
      .send(petData);

    expect(response.status).toBe(201);
    expect(response.body.pet.id).toEqual(expect.any(String));
  });
});
