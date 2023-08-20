export const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal Server Error";  // same work as below statement:
    // if(!err.message) err.message = "Interval Server Error";

    err.statusCode = err.statusCode || 500;  // 500 : Internal server error

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });

}