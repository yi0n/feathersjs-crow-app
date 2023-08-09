const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const boxgroup = sequelizeClient.define('boxgroup', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    name: {
      plural: 'boxgroups'
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

  boxgroup.addScope('defaultScope', {
    order: [ ['position', 'ASC'] ]
  },
  { override: true }
  );

  // eslint-disable-next-line no-unused-vars
  boxgroup.associate = function (models) {
    boxgroup.belongsTo( models.surprisebox );
    boxgroup.hasMany( models.fruit, { onDelete: 'CASCADE' } );
  };

  return boxgroup;
};
