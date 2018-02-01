'use strict';

const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  cardId: { type: String, required: true },
  career: { type: String, required: true },
  financialRequest: { type: Number, required: true }
});

module.exports = mongoose.model('student', Student);

