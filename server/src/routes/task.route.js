// Packages
import express from "express";

// Controllers
import { taskController } from "../controller/index.js";

const { getAllTask, createTask, updateTask, deleteTask, getFilteredTask } =
  taskController;

const router = express.Router();

router.get("/", getAllTask);

router.get("/filter/:status", getFilteredTask);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
