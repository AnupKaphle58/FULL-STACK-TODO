//packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//configs
import { successHandle, errorHandle } from "./config/morgan.js";

//middlewares

//utils
import errorHandler from "./utils/errorHandler.js";
import AppError from "./utils/appError.js";

// Routes
import routes from "./routes/index.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

//Cookie parser
app.use(cookieParser());

// Morgan Handler
app.use(successHandle);
app.use(errorHandle);

// Set Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// When someone access route that does not exist
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handler
app.use(errorHandler);

export default app;
