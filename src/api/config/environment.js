module.exports = {
    host: "localhost",
    port: 3000,
    vendorName: 'ChapterServer',
    auth: {
        secret: '2jkk-aj8V1cbABoMl7sk7khi6cR-DIM3iSmwwDDoXk4S_dG6DtHcdNhACxaPSI5e'
    },
    version: {
        validVersions: [ 1 ],
        defaultVersion: 1
    },
    db: {
        url: 'mongodb://localhost:27017/hapi-app',
        debug: true
    }
}
