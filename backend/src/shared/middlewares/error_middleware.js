import ClientError from "../exceptions/client_error.js";

export default function(err, req, res, next) {
    if (err instanceof ClientError) {
        res.status(err.statusCode).json({
            status : "fail",
            message: err.message
        });
        return;
    }

    if (err.isJoi) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
        return;
    }

    res.status(err.status || 500).json({
        status: "error",
        message: process.env.NODE_ENV !== "production" && err.message 
            ? err.message 
            : "Internal Server Error"
    });
}