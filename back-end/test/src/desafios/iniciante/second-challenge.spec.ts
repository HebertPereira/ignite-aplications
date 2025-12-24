import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "./second-challenge.js";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("Second Challenge suit test", async () => {
  it("should be able to create a user", async () => {
    const response = await request(app.server).post("/users").send({
      id: "efc686f1-9ccb-4570-9b05-34b1c9382250",
      name: "Astolfo rodrigues",
      email: "astolfo@rodrigues.com"
    });

    expect(response.statusCode).toBe(201);
  });

  it("should be able to get a user list", async () => {
    const userData = {
      name: "Astolfo rodrigues",
      email: "astolfo@rodrigues.com"
    };
    await request(app.server).post("/users").send(userData);

    const { status, body } = await request(app.server).get("/users");

    expect(status).toBe(200);
    expect(body).toEqual([
      expect.objectContaining(userData),
      expect.objectContaining(userData)
    ]);
  });
});
