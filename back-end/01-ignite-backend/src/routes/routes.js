import { createUser } from "./createUser.js";
import { deleteUser } from "./deleteUser.js";
import { getUser } from "./getUser.js";
import { updateUser } from "./updateUser.js";

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (req, res) => {
      return getUser(req, res);
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: async (req, res) => {
      return createUser(req, res);
    },
  },
  {
    method: "PUT",
    path: "/users",
    handler: async (req, res) => {
      return updateUser(req, res);
    },
  },
  {
    method: "DELETE",
    path: "/users",
    handler: async (req, res) => {
      return deleteUser(req, res);
    },
  },
];
