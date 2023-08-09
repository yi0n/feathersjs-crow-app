const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const metrics = sequelizeClient.define('metrics', {
    deployedidentifier: {
      field: 'deployed_identifier',
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'injected uuid in client browser'
    },
    useragent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    remoteaddr: {
      field: 'remote_addr',
      type: DataTypes.STRING,
      allowNull: false
    },
    lastlogin: {
      field: 'last_login',
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  metrics.associate = function (models) {
    metrics.belongsTo(models['users']);
  };

  return metrics;
};
