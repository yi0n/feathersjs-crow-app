const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const settings = sequelizeClient.define('settings', {
    default_dark_mode: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    show_sync_state: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    color_primary: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    color_secondary: {
      type: DataTypes.STRING(8),
      allowNull: true
    }
  },
  {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  settings.associate = function (models) {
    settings.belongsTo( models['account'], { foreignKey: { primaryKey: true } } );
  };

  return settings;
};
