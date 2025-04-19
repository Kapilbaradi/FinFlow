const errorMiddleware = async (error, req, res, next) => {
    error.message = error.message || "Internal server error";
    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
}

export default errorMiddleware;