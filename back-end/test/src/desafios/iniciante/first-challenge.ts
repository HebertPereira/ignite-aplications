// Desafio prático: criar uma função que leia um arquivo e depois faça uma requisição HTTP
import axios from "axios";
import Fastify, { type FastifyRequest } from "fastify";

export const server = Fastify();

server.post(
  "/search-git-profile",
  (request: FastifyRequest<{ Body: { name: string } }>, response) => {
    const { body } = request;
    if (body.name) {
      axios
        .get(`https://api.github.com/users/${body.name}`)
        .then((res) => {
          response.send(res.data);
        })
        .catch((err) => {
          response.status(404).send(`${err.message}`);
        });
    } else {
      response.status(500).send();
    }
  }
);

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
