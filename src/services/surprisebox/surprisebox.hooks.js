const { authenticate } = require('@feathersjs/authentication').hooks;
const { isAccountUser, includeAccountId } = require('../../hooks/authorization');

const includeBoxgroups = async context => {
  const { app } = context;
  const sequelize = app.get('sequelizeClient');
  const { boxgroup, fruit } = sequelize.models;
  const association = {
    include: [
      {
        model: boxgroup,
        attributes: ['id', 'name', 'position'],
        include: [ { model: fruit, separate: true } ],
        order: [ { model: fruit }, 'position', 'ASC']
      }
    ],
    order: [
      [ { model: boxgroup }, 'position', 'ASC']
    ]
  };
  context.params.sequelize = Object.assign(association, { raw: false });
  return context;
};

function createWithAssociated(context) {
  const { app } = context;
  const sequelize = app.get('sequelizeClient');
  const { boxgroup, fruit } = sequelize.models;
  let association = {
    include: [
      {
        model: boxgroup,
        include: [ { model: fruit } ]
      }
    ]
  };
  context.params.sequelize = Object.assign(association, { raw: false });
  return context;
}

const patchAssociated = async context => {
  const { app, id, data } = context;
  const boxgroupService = app.service('boxgroup');
  const { boxgroups } = data;
  boxgroups.forEach(group => {
    if( group.id != null  || group.id != undefined ) {
      boxgroupService.patch(group.id, group);
    }else{
      const newBoxgroup = {
        surpriseboxId: id,
        ...group
      };
      boxgroupService.create(newBoxgroup);
    }
  });
  return context;
};

module.exports = {
  before: {
    all: [ authenticate('jwt'), isAccountUser ],
    find: [ includeBoxgroups ],
    get: [ includeBoxgroups ],
    create: [ includeAccountId, createWithAssociated ],
    update: [],
    patch: [ patchAssociated ],
    remove: [  ]
  },

  after: {
    all: [  ],
    find: [],
    get: [  ],
    create: [  ],
    update: [  ],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
