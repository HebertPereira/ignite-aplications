import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";

import { usePetsRoutes } from "./http/controllers/pets/routes";
import { useOrgsRoutes } from "./http/controllers/orgs/routes";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
});
app.register(fastifyCookie);

app.register(usePetsRoutes);
app.register(useOrgsRoutes);

app.setErrorHandler((error, request, response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: "Validation error.",
      issues: error.format()
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Send error to monitoring service
  }

  return response.status(500).send({
    message: "Internal server error."
  });
});
