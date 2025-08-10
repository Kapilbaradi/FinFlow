const errorMiddleware = async (error, req, res, next) => {
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 500;

  //Handles Validation Error
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    error.message = messages.join(" | ");
    error.status = 400;
  }

  // Handles Mongoose CastError
  if (error.name === "CastError") {
    error.message = `Invalid ${error.path}: ${error.value}`;
    error.status = 400;
  }

  //Handle duplicate key error value
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    error.message = `Duplicate field: ${field} already exists`;
    error.statusCode = 400;
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default errorMiddleware;
