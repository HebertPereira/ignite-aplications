import { completeTask } from "./completeTask.js";
import { createTasks } from "./createTask.js";
import { deleteTask } from "./deleteTask.js";
import { editTask } from "./editTask.js";
import { listTasks } from "./listTasks.js";

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => listTasks(req, res),
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => createTasks(req, res),
  },
  {
    method: "PUT",
    path: "/tasks",
    handler: (req, res) => editTask(req, res),
  },
  {
    method: "DELETE",
    path: "/tasks",
    handler: (req, res) => deleteTask(req, res),
  },
  {
    method: "PATCH",
    path: "/tasks",
    handler: (req, res) => completeTask(req, res),
  },
];
