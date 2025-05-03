import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

  const authResponse = await request(app.server).post("/org/auth").send({
    email: orgData.email,
    password: orgData.password
  });

  const { token, sub } = authResponse.body;

  return { token, sub };
}
