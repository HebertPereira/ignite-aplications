import Fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest
} from "fastify";
import setupKnex from "knex";
import { z } from "zod";
import cookie from "@fastify/cookie";

import knexConfig from "../../../knexfile.js";
import { randomUUID } from "node:crypto";

const knex = setupKnex(knexConfig);

const transactionRequestBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"])
});

type TransactionRequestBodyProps = z.infer<typeof transactionRequestBodySchema>;

const transactionRequestParamSchema = z.object({
  id: z?.uuid()
});

type TransactionRequestParamProps = z.infer<
  typeof transactionRequestParamSchema
>;

const authMiddleware = (
  request: FastifyRequest<{ Params: TransactionRequestParamProps }>,
  reply: FastifyReply,
  next: () => void
) => {
  const { sessionId } = request.cookies;

  if (!sessionId) {
    return reply.status(401).send({
      error: "Unauthorized."
    });
  }

  next();
};

const appServer = Fastify();

appServer.register(cookie);

function TransactionsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    { preHandler: [authMiddleware] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sessionId } = request.cookies;

      if (!sessionId) {
        return reply.status(404).send({
          error: "Unauthorized."
        });
      }

      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select("*");

      return reply.send(JSON.stringify({ transactions }));
    }
  );

  app.post(
    "/",

    async (
      request: FastifyRequest<{ Body: TransactionRequestBodyProps }>,
      reply: FastifyReply
    ) => {
      const { title, amount, type } = transactionRequestBodySchema.parse(
        request.body
      );

      let sessionId = request.cookies.sessionId;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.cookie("sessionId", sessionId, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7 // 7 Days
        });
      }

      const transaction = await knex("transactions")
        .insert({
          id: randomUUID(),
          title,
          amount,
          type,
          session_id: sessionId
        })
        .returning("*");

      return reply.send(JSON.stringify({ transaction }));
    }
  );

  app.get(
    "/:id",
    { preHandler: [authMiddleware] },
    async (
      request: FastifyRequest<{ Params: TransactionRequestParamProps }>,
      reply: FastifyReply
    ) => {
      const { sessionId } = request.cookies;
      const { id } = transactionRequestParamSchema.parse(request.params);

      const transaction = await knex("transactions")
        .where("session_id", sessionId)
        .where("id", id)
        .select("*")
        .first();

      return reply.send(JSON.stringify({ transaction }));
    }
  );

  app.get(
    "/summary",
    { preHandler: [authMiddleware] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const sessionId = request.cookies.sessionId;
      let amount = 0;

      const transaction = await knex("transactions")
        .where("session_id", sessionId)
        .select("*");

      transaction.forEach((transaction) => {
        if (transaction.type === "credit") {
          amount = amount + transaction.amount;
        } else {
          amount = amount - transaction.amount;
        }
      });

      return reply.send(JSON.stringify({ amount: `R$ ${amount.toFixed(2)}` }));
    }
  );
}

appServer.register(TransactionsRoutes, {
  prefix: "/transactions"
});

appServer.listen({ port: 3333 });

// - RF

// - [X] O Usuario deve porder criar uma nova transação;
// - [X] O Usuario deve porder obter um resumo da sua conta;
// - [X] O Usuario deve porder listar todas transaçòes que já ocorreram;
// - [X] O Usuario deve porder visualizar uma transação
