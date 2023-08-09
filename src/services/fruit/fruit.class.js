const { Service } = require('feathers-sequelize');

exports.Fruit = class Fruit extends Service {

  findAll(params){
    return super.findAll(params);
  }

  get(id, params){
    return super.get(id, params);
  }

  create(data, params) {
    return super.create(data, params);
  }

  update(id, data, params){
    return super.update(id, data, params);
  }

  remove(id, params){
    return super.remove(id, params);
  }
};
