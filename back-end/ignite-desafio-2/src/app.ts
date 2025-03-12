import fastify from "fastify";
import { Register } from "./routes/register";
import { Diet } from "./routes/diet";

export const app = fastify();

app.register(Register);

app.register(Diet, {
  prefix: "/diet",
});
