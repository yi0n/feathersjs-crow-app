const { Fruit } = require('./fruit.class');
const createModel = require('../../models/fruit.model');
const hooks = require('./fruit.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app)
  };

  // Initialize our service with any options it requires
  app.use('/fruit', new Fruit(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fruit');

  service.hooks(hooks);
};
