import http from "node:http";
import { database } from "./database.js";
import { json } from "./middlewares/json.js";
import { routes } from "./routes/routes.js";

export const currentDB = new database();

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.path === url && route.method === method
  );

  route.handler(req, res);

  res.end();
});

server.listen(3330);
