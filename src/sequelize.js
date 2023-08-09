const Sequelize = require('sequelize');

module.exports = function (app) {
  const db_config = app.get('database');
  const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectOptions: {},
    database: db_config.name,
    host: db_config.host,
    username: db_config.user,
    password: db_config.password,
    port: db_config.port,
    //native: true, //only for postgres
    logging: true,
    define: {
      freezeTableName: true //preservers table name = model name not pluralized
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

    return result;
  };
};
