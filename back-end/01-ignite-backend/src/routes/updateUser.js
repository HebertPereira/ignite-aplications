import { currentDB } from "../server.js";

export const updateUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.writeHead(400).end();
  }

  currentDB.update("users", id, req.body);

  res.writeHead(204).end();
};
