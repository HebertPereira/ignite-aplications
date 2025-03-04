import { currentDB } from "../server.js";

export const completeTask = (req, res) => {
  const { id } = req.body;

  currentDB.edit("tasks", id);

  return res.writeHead(204).end();
};
