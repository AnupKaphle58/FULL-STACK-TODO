import express from "express";

import taskRoute from "./task.route.js";

const router = express.Router();

router.use("/task", taskRoute);

export default router;
