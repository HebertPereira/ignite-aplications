import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function Diet(app: FastifyInstance) {
  app.post(
    "/create-meal/:authorId",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getMealSchema = z.object({
        title: z.string(),
        description: z.string(),
        on_diet: z.boolean(),
        date: z.string(),
      });

      const getParamsSchema = z.object({
        authorId: z.string(),
      });

      const { title, description, on_diet, date } = getMealSchema.parse(
        request.body
      );

      const { authorId } = getParamsSchema.parse(request.params);

      await knex("diet").insert({
        id: randomUUID(),
        author: authorId,
        title,
        description,
        on_diet,
        date,
      });

      return response.status(201).send();
    }
  );

  app.get(
    "/list-meals/:authorId",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getParamsSchema = z.object({
        authorId: z.string(),
      });

      const { authorId } = getParamsSchema.parse(request.params);

      const getMeals = await knex("diet").where("author", authorId).select();

      return response.status(200).send({ meals: getMeals });
    }
  );

  app.get(
    "/list-meals/:authorId/:id",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getParamsSchema = z.object({
        id: z.string(),
        authorId: z.string(),
      });

      const { authorId, id } = getParamsSchema.parse(request.params);

      const mealData = await knex("diet")
        .where({ author: authorId, id })
        .select();

      return response.status(200).send({ meal: mealData[0] });
    }
  );

  app.put(
    "/list-meals/:authorId/:id",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getParamsSchema = z.object({
        id: z.string(),
        authorId: z.string(),
      });

      const { authorId, id } = getParamsSchema.parse(request.params);

      const getBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        on_diet: z.boolean(),
        date: z.string(),
      });

      const { title, description, on_diet, date } = getBodySchema.parse(
        request.body
      );

      await knex("diet").where({ author: authorId, id }).update({
        title,
        description,
        on_diet,
        date,
      });

      return response.status(204).send();
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

      return response.status(204).send();
    }
  );

  app.get(
    "/summary/:authorId",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getParamsSchema = z.object({
        authorId: z.string(),
      });

      const { authorId } = getParamsSchema.parse(request.params);

      const summaryDietMeals = await knex("diet")
        .where({ author: authorId })
        .select();

      const numberOfMeals = summaryDietMeals.length;
      const numberOfMealsOnDiet = summaryDietMeals.filter(
        (res) => res.on_diet === 1
      ).length;
      const numberOfMealsNotOnDiet = summaryDietMeals.filter(
        (res) => res.on_diet === 0
      ).length;
      let bestStreak = 0;
      let lastStreak = 0;

      summaryDietMeals.forEach((meal, index) => {
        if (meal.on_diet) {
          lastStreak = lastStreak + 1;
          if (lastStreak > bestStreak) {
            bestStreak = lastStreak;
          }
        } else {
          lastStreak = 0;
        }
      });

      return response.status(200).send({
        diet: {
          numberOfMeals,
          onDiet: numberOfMealsOnDiet,
          nonDiet: numberOfMealsNotOnDiet,
          bestStreak,
        },
      });
    }
  );
}
