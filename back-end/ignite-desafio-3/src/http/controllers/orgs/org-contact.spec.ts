import request from "supertest";

import { app } from "@/app";

describe("Org Contact (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get org contact details", async () => {
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

    const { body } = await request(app.server)
      .post("/org/create")
      .send(orgData);

    const response = await request(app.server).get(
      `/orgs/contact/${body.org.id}`
    );

    expect(response.status).toBe(200);
  });
});
