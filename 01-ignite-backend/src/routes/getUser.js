import { currentDB } from "../server.js";

export const getUser = async (req, res) => {
  const users = currentDB.select("users");

  return res.writeHead(200).end(JSON.stringify(users));
};
