// 🔧 Desafio prático: criar um CRUD simples (ex: usuários) usando Fastify.

import Fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest
} from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export const app = Fastify();

export interface UsersProps {
  id?: string;
  name: string;
  email: string;
}

const Users: UsersProps[] = [];

const userRequestBodySchema = z.object({
  name: z.string(),
  email: z.string()
});

export type UserRequestBodyProps = z.infer<typeof userRequestBodySchema>;

const userRequestParamSchema = z.object({
  id: z.string()
});

export type UserRequestParamProps = z.infer<typeof userRequestParamSchema>;

const UserService = async (appServer: FastifyInstance) => {
  app.addHook("preHandler", async (request, reply) => {
    console.log(`[${request.method}]: [${request.url}]`);
  });

  appServer.get(`/users`, async (request: FastifyRequest) => {
    return Users;
  });

  appServer.post(
    `/users`,
    async (
      request: FastifyRequest<{ Body: UserRequestBodyProps }>,
      reply: FastifyReply
    ) => {
      const { body } = request;

      if (body.name && body.email) {
        const { name, email } = body;

        Users.push({ id: randomUUID(), name, email });

        return reply.status(201).send();
      } else {
        return reply.status(422).send();
      }
    }
  );

  appServer.patch(
    `/user/:id`,
    async (
      request: FastifyRequest<{
        Params: UserRequestParamProps;
        Body: UserRequestBodyProps;
      }>,
      reply: FastifyReply
    ) => {
      const { id } = request.params;
      const body = request.body;

      const userIndex = Users.findIndex((item) => item.id === id);

      if (
        userIndex !== -1 &&
        (body.name !== undefined || body.email !== undefined)
      ) {
        Users[userIndex] = { ...Users[userIndex], ...body };

        return reply.status(200).send();
      } else {
        return reply.status(404).send();
      }
    }
  );

  appServer.delete(
    `/user/:id`,
    async (
      request: FastifyRequest<{ Params: UserRequestParamProps }>,
      reply: FastifyReply
    ) => {
      const { id } = request.params;

      const userIndex = Users.findIndex((item) => item.id === id);

      if (userIndex !== -1) {
        Users.splice(userIndex, 1);

        return reply.status(200).send();
      } else {
        return reply.status(404).send();
      }
    }
  );
};

app.register(UserService);

app.listen({ port: 3333 });
