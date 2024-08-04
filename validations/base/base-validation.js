const ValidationError = require('./validation-error');
const ValidationResult = require('./validation-result');

/**
 * BaseModelValidator is a class responsible for handling model validations.
 * It allows adding custom validations and provides some basic validation methods.
 */
class BaseModelValidator {
    constructor() {
        /**
         * @type {Array<Function>}
         * @private
         */
        this.validations = [];
    }

    /**
     * Adds a validation function to the list of validations.
     *
     * @param {Function} validator - A function that returns a ValidationError if validation fails, or null if it passes.
     */
    addValidation(validator) {
        this.validations.push(validator);
    }

    /**
     * Executes all validation functions and returns the result.
     *
     * @returns {ValidationResult} The result of the validations, containing a boolean indicating success and an array of errors if any.
     */
    validate() {
        const errors = [];
        for (const validator of this.validations) {
            const result = validator();
            if (result !== null) {
                errors.push(result);
            }
        }

        return new ValidationResult(errors.length === 0, errors);
    }

    /**
     * Checks if a field is not null or an empty string.
     *
     * @param {any} field - The field to check.
     * @param {string|null} [message=null] - The error message if validation fails.
     * @param {number|null} [code=null] - The error code if validation fails.
     * @returns {ValidationError|null} A ValidationError if the field is invalid, otherwise null.
     */
    checkNotNull(field, message = null, code = null) {
       return field === '' ? new ValidationError(message,code) : null;
    }

    /**
     * Checks if a field's length is within a specified range.
     *
     * @param {string} field - The field to check.
     * @param {number} min - The minimum length.
     * @param {number} max - The maximum length.
     * @param {string|null} [message=null] - The error message if validation fails.
     * @param {number|null} [code=null] - The error code if validation fails.
     * @returns {ValidationError|null} A ValidationError if the field's length is outside the specified range, otherwise null.
     */
    checkLength(field, min, max, message = null, code = null) {
       return (field.length<min || field.length > max)
            ? new ValidationError(message,code)
            : null;
    }

    /**
     * Executes a custom validation function on a field.
     *
     * @param {Function} callback - A callback function that takes the field as an argument and returns a boolean indicating validity.
     * @param {any} field - The field to validate.
     * @param {string|null} [message=null] - The error message if validation fails.
     * @param {number|null} [code=null] - The error code if validation fails.
     * @returns {ValidationError|null} A ValidationError if the custom validation fails, otherwise null.
     */
    checkCustomValidation(callback, field, message = null, code = null) {
       return !callback(field) ? new ValidationError(message,code) : null;
    }
}

module.exports = BaseModelValidator;
