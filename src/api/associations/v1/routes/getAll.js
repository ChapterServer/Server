'use strict';

const Assoc = require('../model/Association');

module.exports = {
  method: 'GET',
  path: '/v1/associations',
  config: {
    handler: (req, res) => {
      Assoc
        .find()
        .select('-__v -_id')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!users.length) {
            res([]);
          } else {
            res(users);
          }
        });
    }
  }
}
