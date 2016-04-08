'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  code: { type: String, required: true, index: { unique: true } }
});

module.exports = mongoose.model('Association', model);
