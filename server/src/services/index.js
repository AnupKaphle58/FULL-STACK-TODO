import {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTask,
  completedRate,
} from "./task.service.js";

const taskService = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTask,
  completedRate,
};

export { taskService };
