const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email:{
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  interview_basket: {
    interviews: [
      {
        interviewId: {
          type: Schema.Types.ObjectId,
          ref: 'Interview_Basket',
          required: true
        }
      }
    ]
  }
});



module.exports = mongoose.model('User', userSchema);
