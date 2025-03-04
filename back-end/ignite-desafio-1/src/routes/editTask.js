import { currentDB } from "../server.js";

export const editTask = (req, res) => {
  const { id, title, description } = req.body;

  if (title !== "" && title !== undefined) {
    if (description !== "" && description !== undefined) {
      const data = {
        title,
        description,
        updated_at: new Date().toString(),
      };
      currentDB.update("tasks", id, data);
      return res.writeHead(204).end();
    }
    const data = {
      title,
      updated_at: new Date().toString(),
    };
    currentDB.update("tasks", id, data);
    return res.writeHead(204).end();
  } else {
    return res.writeHead(400).end("Parâmetros invalidos!");
  }
};
