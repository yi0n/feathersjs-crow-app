const { disallow } = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const withAccount = async context => {
  const { app } = context;
  const sequelize = app.get('sequelizeClient');
  const { account } = sequelize.models;
  let association = {
    include: [
      { model: account, attributes: ['uuid', 'company_name'] }
    ]
  };
  context.params.sequelize = Object.assign(association, { raw: false });
  return context;
}

/**
 *
 * @param {*} context
 */
const glueRole = async context => {

}



module.exports = {
  before: {
    all: [ withAccount, authenticate('jwt'), protect('accountId') ],
    find: [ disallow('external') ],
    get: [  ],
    create: [ disallow('external'), hashPassword('password') ],
    update: [ disallow() ],
    patch: [ disallow('external'), hashPassword('password') ],
    remove: [ disallow() ] //! nur admin darf
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'accountId', 'authkey', 'status', 'createdAt', 'updatedAt') // ! accountId zwar rausgefiltert aber im include mit dazu genommen, in global app.hooks dann die account.id raus
    ],
    find: [],
    get: [],
    create: [],
    update: [],
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
