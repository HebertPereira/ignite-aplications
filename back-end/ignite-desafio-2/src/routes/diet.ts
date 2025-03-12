import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function Diet(app: FastifyInstance) {
  app.post(
    "/create-meal/:id",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getMealSchema = z.object({
        title: z.string(),
        description: z.string(),
        on_diet: z.boolean(),
        date: z.string(),
      });

      const getParamsSchema = z.object({
        id: z.string(),
      });

      const { title, description, on_diet, date } = getMealSchema.parse(
        request.body
      );

      const { id } = getParamsSchema.parse(request.params);

      await knex("diet").insert({
        id: randomUUID(),
        author: id,
        title,
        description,
        on_diet,
        date,
      });

      return response.status(201).send();
    }
  );

  app.get(
    "/list-meals/:id",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getParamsSchema = z.object({
        id: z.string(),
      });

      const { id } = getParamsSchema.parse(request.params);

      const getMeals = await knex("diet").where("author", id).select();

      return response.status(200).send({ meals: getMeals });
    }
  );

  app.delete(
    "/delete-meal/:authorId/:id",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getParamsSchema = z.object({
        id: z.string(),
        authorId: z.string(),
      });

      const { authorId, id } = getParamsSchema.parse(request.params);

      await knex("diet").where({ author: authorId, id }).delete();

      return response.status(200).send();
    }
  );
}
