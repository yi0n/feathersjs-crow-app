const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow } = require("feathers-hooks-common");

//if id -> update, else its new and needs create
const addFruits = async context => {
  const { app, method, result, data, params } = context;
  const FruitService = app.service('fruit');
  const { fruits } = data;
  fruits.forEach(fruit => {
    if( fruit.id != null ){
      console.log(`Fruit ${fruit.name} has Id -> therefore update`);
    }else{
      FruitService.create(fruit);
    }
  });
  return context;
};



module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ disallow('external')],
    get: [disallow('external')],
    create: [],
    update: [],
    patch: [],
    remove: []
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
