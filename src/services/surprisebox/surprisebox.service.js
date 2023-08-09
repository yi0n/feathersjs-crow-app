
const { Surprisebox } = require('./surprisebox.class');
const createModelSurprisebox = require('../../models/surprisebox.model');
const hooks = require('./surprisebox.hooks');


module.exports = function (app) {
  const options = {
    Model: createModelSurprisebox(app)
  };
  const Model = new Surprisebox(options, app);
  app.use('/surprisebox', Model);
  const service = app.service('surprisebox');
  service.hooks(hooks);
};
