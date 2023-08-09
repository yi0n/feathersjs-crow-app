const { Service } = require('feathers-sequelize');


exports.Settings = class Settings extends Service {
  app;

  constructor(options, app){
    super(options, app);
    this.app = app;
  }

  async find(data, params){
    // call the account service here
    const sequelizeClient = this.app.get('sequelizeClient');;
    console.log(sequelizeClient)
    //const row = sequelizeClient.
    // one to one relation, therefore settings does not need an ID field. sequelize expects it or requires the primary key on the FK
    const res = super.find({query: {accountId: { $eq: 2}}})
    return res;
  }
  get(id, params){
    return super.get(id, params);
  }
};
