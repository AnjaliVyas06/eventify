import ApiError from "../utils/ApiError.js";

const errorHandler = (error, _req, res, _next) => {
    const isProduction = process.env.NODE_ENV === "production";
    const statusCode = error instanceof ApiError ? error.statusCode : 500;

    if (statusCode === 500) {
        console.error(error);
    }

    res.status(statusCode).json({
        success: false,
        message: isProduction && statusCode === 500
            ? "Internal server error"
            : error.message,
        ...(error.details?.length ? { details: error.details } : {}),
    });
};

export default errorHandler;
