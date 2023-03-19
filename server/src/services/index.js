import {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTask,
} from "./task.service.js";

const taskService = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTask,
};

export { taskService };
