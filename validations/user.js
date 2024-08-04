const BaseModelValidator = require('./base/base-validation');

class UserValidation extends BaseModelValidator{
    constructor(user){
        super();
        this.addValidation(()=>this.checkLength(user.username,3,50,'Username 3 and 50 chars',101));
    }
}

module.exports = UserValidation;