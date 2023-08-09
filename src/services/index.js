const users = require('./users/users.service.js');
const account = require('./account/account.service.js');
const settings = require('./settings/settings.service.js');

const surprisebox = require('./surprisebox/surprisebox.service.js');
const boxgroup = require('./boxgroup/boxgroup.service.js');
const fruit = require('./fruit/fruit.service.js');
const upload = require('./upload/upload.service.js');

const metrics = require('./metrics/metrics.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(account);
  app.configure(settings);

  app.configure(fruit);
  app.configure(boxgroup);
  app.configure(surprisebox);
  app.configure(upload);
  app.configure(metrics);
};
