import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";

interface UserDataProps {
  email: string;
  id: string;
  name: string;
  password: string;
}

export async function Register(app: FastifyInstance) {
  app.post(
    "/login",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getUserSchema = z.object({
        email: z.string(),
        password: z.string(),
      });

      const { email, password } = getUserSchema.parse(request.body);

      const userData: Array<UserDataProps> = await knex("users")
        .where("email", email)
        .select();

      if (userData && userData[0].password === password) {
        return response.status(200).send({ id: userData[0].id });
      } else {
        return response
          .status(404)
          .send("Usuario não encontrado ou não autorizado!");
      }
    }
  );

  app.post(
    "/register",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getUserSchema = z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
      });
      const { email, name, password } = getUserSchema.parse(request.body);

      const userData = await knex("users").where("email", email).select();

      if (userData[0]?.email === email) {
        return response
          .status(400)
          .send("O email usado já pertence a um usuario da plataforma!");
      } else {
        await knex("users").insert({
          id: randomUUID(),
          email,
          name,
          password,
        });

        return response.status(201).send(email);
      }
    }
  );
}
