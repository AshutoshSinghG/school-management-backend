const { body, query, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const handleValidationErrors = (req, _res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg);
        return next(new AppError(messages.join(', '), 400));
    }
    next();
};

const addSchoolRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('School name is required')
        .isLength({ max: 255 })
        .withMessage('School name must not exceed 255 characters'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ max: 500 })
        .withMessage('Address must not exceed 500 characters'),
    body('latitude')
        .notEmpty()
        .withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be between -90 and 90'),
    body('longitude')
        .notEmpty()
        .withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be between -180 and 180'),
    handleValidationErrors,
];

const listSchoolsRules = [
    query('latitude')
        .notEmpty()
        .withMessage('Latitude query parameter is required')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be between -90 and 90'),
    query('longitude')
        .notEmpty()
        .withMessage('Longitude query parameter is required')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be between -180 and 180'),
    handleValidationErrors,
];

module.exports = { addSchoolRules, listSchoolsRules };
