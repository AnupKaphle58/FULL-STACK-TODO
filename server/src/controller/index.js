import {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTask,
  completedRate,
} from "./task.controller.js";

const taskController = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTask,
  completedRate,
};

export { taskController };
