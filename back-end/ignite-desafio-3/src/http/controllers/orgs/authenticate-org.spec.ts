import request from "supertest";

import { app } from "@/app";

describe("Authenticate Org (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate an org", async () => {
    const orgData = {
      name: "Salve patinhas",
      author_name: "Julio Verne",
      email: "juliodescobreterra@hotmail.com",
      whatsapp: "+55 61 94002-8922",
      password: "hippopotamo",
      cep: "30979-825",
      state: "Maranhão",
      city: "Blumenau",
      neighborhood: "Asc SA",
      street: "Rua paratinga",
      latitude: -32.586156,
      longitude: -32.586199
    };

    await request(app.server).post("/org/create").send(orgData);

    const response = await request(app.server).post(`/org/auth`).send({
      email: orgData.email,
      password: orgData.password
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      sub: expect.any(String)
    });
  });
});
