const includeFruits = (context) => {
  console.log('fruits included');
  return context;
};

function orderByPosition(context) {
  context.params.sequelize = {
    order: [ ['position', 'ASC'] ]
  };
  return context;
}

function createWithAssociated(context) {
  const { app } = context;
  const sequelize = app.get('sequelizeClient');
  const { fruit } = sequelize.models;
  let association = {
    include: [
      {
        model: fruit
      }
    ]
  };
  context.params.sequelize = Object.assign(association, { raw: false });
  return context;
}

const patchAssociated = async context => {
  const { app, data } = context;
  const FruitService = app.service('fruit');
  const { id, fruits } = data;
  fruits.forEach(fruit => {
    if( fruit.id != null || fruit.id != undefined ){
      FruitService.patch(fruit.id, fruit);
    }else{
      //parent group ID
      const newFruit = {
        name: fruit.name,
        position: fruit.position,
        boxgroupId: id
      };
      FruitService.create( newFruit );
    }
  });
  return context;
};



module.exports = {
  before: {
    all: [  ],
    find: [ orderByPosition ],
    get: [],
    create: [ createWithAssociated ],
    update: [],
    patch: [ patchAssociated ],
    remove: [  ]
  },

  after: {
    all: [],
    find: [],
    get: [includeFruits],
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
