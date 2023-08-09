const { Service } = require('feathers-sequelize');

exports.Boxgroup = class Boxgroup extends Service {

  constructor( modelOptions, app ){
    super(modelOptions, app);
    const sequelize = app.get('sequelizeClient');
    this.models = sequelize.models;
  }

  findAll(params){
    return super.findAll(params);
  }

  find(params){
    return super.find(params);
  }

  get(id, params){
    return super.get(id, params);
  }

  create(data, params){

    return super.create(data, params);
  }

  update(id, data, params){
    return super.update(id, data, params);
  }

  //DELETE
  remove(id, params){
    return super.remove(id, params);
  }
};
