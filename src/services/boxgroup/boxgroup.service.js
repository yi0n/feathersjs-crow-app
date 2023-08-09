const { Boxgroup } = require('./boxgroup.class');
const createModel = require('../../models/boxgroup.model');
const hooks = require('./boxgroup.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app)
  };
  //service not needed
  app.use('/boxgroup', new Boxgroup(options, app));
  const service = app.service('boxgroup');
  service.hooks(hooks);
};
