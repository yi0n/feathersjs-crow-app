/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const host = app.get('host');
const port = app.get('port');
const server = app.listen(port, host);

//Doing this with Browserify has security implications.
//Be careful not to expose package.json to the client,
//as it means that all your dependency version numbers
const serverpkg = require('../package.json');
//app.set('version', serverpkg.version);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise %s %s', p, reason)
  //process.exit(0);
);

server.on('listening', () =>
  logger.info(`${serverpkg.description} v${serverpkg.version} started on %s:%d`, host, port)
);
