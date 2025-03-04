import { randomUUID } from "node:crypto";
import { currentDB } from "../server.js";

export const createTasks = (req, res) => {
  const { title, description } = req.body;

  const data = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date().toString(),
    updated_at: null,
  };

  if (data.title !== "" && data.title !== undefined) {
    if (data.description !== "" && data.description !== undefined) {
      currentDB.insert("tasks", data);
      return res.writeHead(204).end();
    }
    return res.writeHead(400).end("Parâmetros invalidos!");
  } else {
    return res.writeHead(400).end("Parâmetros invalidos!");
  }
};
