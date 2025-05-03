import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-user";

describe("Find Nearby Pets (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

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

  it("should be able to search pets by city", async () => {
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

    await request(app.server)
      .post("/pets/register")
      .send(petData)
      .set("Authorization", `Bearer ${token}`);
    await request(app.server)
      .post("/pets/register")
      .send(petData)
      .set("Authorization", `Bearer ${token}`);
    await request(app.server)
      .post("/pets/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...petData,
        age: "1",
        size: "small",
        energy_level: "high",
        environment: "indoor"
      });

    // Test with only city filter
    const onlyCityResponse = await request(app.server).get("/pet/find").query({
      city: orgData.city
    });

    expect(onlyCityResponse.status).toBe(200);
    expect(onlyCityResponse.body?.pets).toHaveLength(3);

    // Test with city and age filter
    const onlyCityAndAgeResponse = await request(app.server)
      .get("/pet/find")
      .query({
        city: orgData.city,
        age: "2"
      });

    expect(onlyCityAndAgeResponse.status).toBe(200);
    expect(onlyCityAndAgeResponse.body?.pets).toHaveLength(2);

    // Test with city and size filter
    const onlyCityAndSizeResponse = await request(app.server)
      .get("/pet/find")
      .query({
        city: orgData.city,
        size: "small"
      });

    expect(onlyCityAndSizeResponse.status).toBe(200);
    expect(onlyCityAndSizeResponse.body?.pets).toHaveLength(1);

    // Test with city and energy_level filter
    const onlyCityAndEnergyLevelResponse = await request(app.server)
      .get("/pet/find")
      .query({
        city: orgData.city,
        energy_level: "high"
      });

    expect(onlyCityAndEnergyLevelResponse.status).toBe(200);
    expect(onlyCityAndEnergyLevelResponse.body?.pets).toHaveLength(1);

    // Test with city and environment filter
    const onlyCityAndEnvironmentResponse = await request(app.server)
      .get("/pet/find")
      .query({
        city: orgData.city,
        environment: "outdoor"
      });

    expect(onlyCityAndEnvironmentResponse.status).toBe(200);
    expect(onlyCityAndEnvironmentResponse.body?.pets).toHaveLength(2);

    // Test with all filters
    const AllFiltersResponse = await request(app.server)
      .get("/pet/find")
      .query({
        city: orgData.city,
        age: "1",
        size: "small",
        energy_level: "high",
        environment: "indoor"
      });

    expect(AllFiltersResponse.status).toBe(200);
    expect(AllFiltersResponse.body?.pets).toHaveLength(1);
  });
});
