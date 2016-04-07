'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const expect = Code.expect;

const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;

let server;

beforeEach((done) => {

    server = new Hapi.Server();
    server.connection();

    done();
});

describe('VersionedRoutes', () => {

    beforeEach((done) => {

        server.register([{
            register: require('hapi-api-version'),
            options: {
                validVersions: [ 1 ],
                defaultVersion: 1,
                vendorName: 'ChapterServer'
            }
        }], (err) => {

            if (err) {
                return console.error('Can not register plugins', err);
            }
        });

        done();
    });

    describe(' -> /hello', () => {

        beforeEach((done) => {
            server.route({
                method: 'GET',
                path: '/v1/hello',
                handler: function (request, reply) {

                    const response = {
                        version: 1,
                        data: 'versioned'
                    };

                    return reply(response);
                }
            });
            done();
        });

        it('returns version 1', (done) => {

            server.inject({
                method: 'GET',
                url: '/hello',
                headers: {
                    'api-version': '1'
                }
            }, (response) => {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(1);
                expect(response.result.data).to.equal('versioned');

                done();
            });
        });
    });
});
