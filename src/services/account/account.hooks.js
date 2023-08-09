const { disallow } = require('feathers-hooks-common');

const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt'), disallow('external') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [ ]
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
