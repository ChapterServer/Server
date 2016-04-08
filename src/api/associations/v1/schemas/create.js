'use strict';

const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(200).required(),
  code: Joi.string().lowercase().trim().min(2).max(30).required()
});

module.exports = schema;
