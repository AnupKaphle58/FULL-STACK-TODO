import AppError from "./appError.js";

import config from "../config/config.js";
import logger from "../config/logger.js";

const sendErrorDev = async (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: `${err.message}`,
    stack: err.stack,
  });

const sendErrorProd = async (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: `${err.message}`,
    });
  }

  // B) Programming or other unknown error
  // 1) Log error
  logger.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(500).json({
    status: "error",
    message: `Something went wrong!`,
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Send Errors in The Development Phase
  if (config.env === "development") {
    sendErrorDev(err, req, res);

    // Send Errors in The Production Phase
  } else if (config.env === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
