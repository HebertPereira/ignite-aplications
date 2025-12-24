import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { server as app } from "./first-challenge.js";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("First Challenge suit test", async () => {
  it("should be abble to get a user list", async () => {
    const response = await request(app.server)
      .post("/search-git-profile")
      .send({
        name: "HebertPereira"
      });

    expect(response.status).toBe(200);
  });
});
