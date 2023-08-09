// Initializes the `metrics` service on path `/stats`
const { Metrics } = require('./metrics.class');
const createModel = require('../../models/metrics.model');
const hooks = require('./metrics.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/metrics', new Metrics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('metrics');

  service.hooks(hooks);
};
