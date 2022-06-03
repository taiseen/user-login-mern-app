export const pageNotFound = (res, req, next) => {
    req.status(404).json({ page: '404 | URL Not Found' });
    next();
}


// default error handler
export const errorHandler = (err, req, res, next) => {

    console.log(err);
    
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}