'use strict';

const Assoc = require('../model/Association');
const schema = require('../schemas/create');

module.exports = {
  method: 'POST',
  path: '/v1/associations',
  config: {
    handler: (req, res) => {
      let assoc = new Assoc();
      assoc.name = req.payload.name;
      assoc.code = req.payload.code;
      assoc.save((err, assoc) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        res(assoc).code(201);
      });
    },
    validate: {
      payload: schema
    }
  }
}
