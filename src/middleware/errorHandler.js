const env = require('../config/env');

const errorHandler = (err, req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (env.nodeEnv === 'development') {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    }

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }

    console.error('UNEXPECTED ERROR:', err);
    return res.status(500).json({
        success: false,
        status: 'error',
        message: 'Something went wrong',
    });
};

module.exports = errorHandler;
