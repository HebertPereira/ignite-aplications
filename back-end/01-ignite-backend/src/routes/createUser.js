import { randomUUID } from "node:crypto";
import { currentDB } from "../server.js";

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: randomUUID(),
    name,
    email,
  };

  currentDB.insert("users", user);

  return res.writeHead(201).end();
};
