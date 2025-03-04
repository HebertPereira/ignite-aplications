import { currentDB } from "../server.js";

export const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.writeHead(400).end();
  }

  currentDB.delete("users", id);

  res.writeHead(204).end();
};
