const { authenticate } = require('@feathersjs/authentication').hooks;
const { isAccountUser, includeAccountId } = require('../../hooks/authorization');
const  { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt'), isAccountUser ],
    find: [ ],
    get: [  ],
    create: [], //[ disallow() ],
    update: [disallow() ],
    patch: [ includeAccountId ],
    remove: [ disallow() ]
  },

  after: {
    all: [],
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
