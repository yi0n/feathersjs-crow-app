const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const surprisebox = sequelizeClient.define('surprisebox', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
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
  surprisebox.associate = function (models) {
    surprisebox.hasMany( models['boxgroup'], { onDelete: 'CASCADE' } );
    surprisebox.belongsTo( models['account'] );
  };

  return surprisebox;
};
