import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";
import fastifyCookie from "@fastify/cookie";

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

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

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
