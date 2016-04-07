const env = require('./environment');

module.exports = {
    register: require('hapi-api-version'),
    options: {
        validVersions: env.version.validVersions,
        defaultVersion: env.version.defaultVersion,
        vendorName: env.vendorName
    }
}
