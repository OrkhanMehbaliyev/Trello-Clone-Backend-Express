const ValidationError = require("./validation-error");

class ValidationResult {
    /**
     * 
     * @param {boolean} isValid 
     * @param {ValidationError[]} errors 
     */
    constructor(isValid, errors = []) {
        this.isValid = isValid;
        this.errors = errors;
    }

    toString() {
        let res = '';
        for (const validationError of this.errors) {
            res += validationError.error;
            res += '\n';
        }
        return res.trim();
    }
}

module.exports = ValidationResult;