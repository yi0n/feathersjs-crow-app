// Application hooks that run for every service
const { protect } = require('@feathersjs/authentication-local').hooks;
const path = require('path')


module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ protect('accountId', 'createdAt', 'updatedAt') ], //! filters NOT in includes!
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
