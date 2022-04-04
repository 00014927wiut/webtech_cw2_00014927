const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const basket_schema = new Schema({
  status: {
    type: Boolean,
    required: true
  },
  question1: {
    type: String,
    required: true
  },
  question2: {
    type: String,
    required: true
  },
  question3: {
    type: String,
    required: true
  },
  answer1: {
    type: String,
    required: true
  },
  answer2: {
    type: String,
    required: true
  },
  answer3: {
    type: String,
    required: true
  },
  recommendation:{
    type: String,
    required: true
  },
  course:{
    type: String,
    required: true
  },
  university:{
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});



module.exports = mongoose.model('Interview_Basket', basket_schema);
