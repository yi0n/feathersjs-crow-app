const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['active', 'pending', 'paused', 'deactivated', 'deleted'],
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      field: 'password_hash',
      type: DataTypes.STRING,
      allowNull: false
    },
    authkey: {
      field: 'auth_key',
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
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
  users.associate = function (models) {
    users.belongsTo( models['account'] );
  };

  return users;
};
