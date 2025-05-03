import request from "supertest";

import { app } from "@/app";

describe("Nearby Org (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby orgs", async () => {
    const orgData = {
      name: "Salve patinhas",
      author_name: "Julio Verne",
      email: "juliodescobreterra@hotmail.com",
      whatsapp: "+55 61 94002-8922",
      password: "$2b$06$0uBWZO8v1txDXbC8wMXzWe9Ffvw4FafIr2x238PYXs4hsSfLPvrJ6",
      cep: "30979-825",
      state: "Maranhão",
      city: "Blumenau",
      neighborhood: "Asc SA",
      street: "Rua paratinga",
      latitude: -32.586156,
      longitude: -32.586199
    };

    await request(app.server).post("/orgs/create").send(orgData);
    await request(app.server)
      .post("/orgs/create")
      .send({ ...orgData, email: "juliodescobrenucleo@hotmail.com" });

    const response = await request(app.server)
      .get(`/orgs/nearby-orgs`)
      .query({
        latitude: orgData.latitude,
        longitude: orgData.longitude
      })
      .send({
        email: orgData.email,
        password: orgData.password
      });

    expect(response.status).toBe(200);
  });
});
