import { currentDB } from "../server.js";

export const deleteTask = (req, res) => {
  const { id } = req.body;

  currentDB.delete("tasks", id);

  return res.writeHead(204);
};
