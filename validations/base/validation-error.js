class ValidationError{
    /**
     * 
     * @param {string} error 
     * @param {Number} code 
     */
    constructor(error = null,code = null){
        this.error = error;
        this.code  = code;
    }

}

module.exports = ValidationError;