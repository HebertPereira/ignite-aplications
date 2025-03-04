import { currentDB } from "../server.js";

export const listTasks = (req, res) => {
  const data = currentDB.select("tasks");

  res.writeHead(200).end(JSON.stringify(data));
};
