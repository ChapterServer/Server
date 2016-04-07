const Hapi = require('hapi');
const Joi = require('joi');
const glob = require('glob');
const mongoose = require('mongoose');
const path = require('path');
const env = require('./environment');

const server = new Hapi.Server();

server.connection({
    host: env.host,
    port: env.port,
    routes: { cors: true }
});

server.register([
    require('./good-config'),
    require('./version-config'),
    require('hapi-auth-jwt')
], (err) => {
    if (err) { throw err; }

    server.auth.strategy('jwt', 'jwt', 'try', {
        key: env.auth.secret,
        verifyOptions: { algorithms: ['HS256'] }
    });


    // Add the route
    server.route({
        method: 'GET',
        path:'/v1/hello',
        handler: function (request, reply) {

            return reply('hello world');
        }
    });

    console.log(path.join(__dirname, '..'));

    // Look through the routes in
    // all the subdirectories of API
    // and create a new route for each
    glob.sync('../**/routes/*.js', {
      root: __dirname
    }).forEach(file => {
      console.log(path.join(path.join(__dirname, '..'), file));
      const route = require(path.join(path.join(__dirname, '..'), file));
      server.route(route);
    });

    server.start((err) => {
        if (err) { throw err; }
        server.log('info', 'Server running at: ' + server.info.uri);

        // Once started, connect to Mongo through Mongoose
        mongoose.set('debug', env.db.debug);
        mongoose.connect(env.db.url, {}, (err) => {
          if (err) {
            throw err;
          }
        });
    });
});

module.exports = server;
