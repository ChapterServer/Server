const Hapi = require('hapi');
const Joi = require('joi');
const env = require('./environment');

const server = new Hapi.Server();

server.connection({
    host: env.host,
    port: env.port
});

server.register([
    require('./good-config'),
    require('./version-config')
], (err) => {
    if (err) { throw err; }

    // Add the route
    server.route({
        method: 'GET',
        path:'/v1/hello',
        handler: function (request, reply) {

            return reply('hello world');
        }
    });

    server.start((err) => {
        if (err) { throw err; }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;
