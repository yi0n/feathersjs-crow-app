const { Service } = require('feathers-sequelize');

/**
 * Feathers Auth checks the password hash bcrypt encrypted
 * https://bcrypt.online/
 * https://security.stackexchange.com/questions/17207/recommended-of-rounds-for-bcrypt/17238#17238
 */
exports.Users = class Users extends Service {
  get(id, params){
    return super.get(id, params);
  }
};
