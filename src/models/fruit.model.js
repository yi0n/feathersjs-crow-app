
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const fruit = sequelizeClient.define('fruit', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    name: {
      plural: 'fruits'
    }
  },
  {
    order: [ ['position', 'ASC'] ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  fruit.addScope('defaultScope', {
    order: [ ['position', 'ASC'] ]
  },
  { override: true }
  );

  // eslint-disable-next-line no-unused-vars
  fruit.associate = function (models) {
    fruit.belongsTo( models['boxgroup'] );
  };
  return fruit;
};
