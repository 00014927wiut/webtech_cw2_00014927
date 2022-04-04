const User = require('../models/user');
const Interview_Basket = require('../models/interview_basket');

exports.getIndex = (req, res, next) => {
  Interview_Basket.find().populate('userId')
  .then((interviews)=>{
    res.render('interviews/index', {
      title: 'Interviews',
      interviewList: interviews
    });
  }).catch(err => {console.log(err)})
};

exports.getDetail = (req, res, next) => {
  const id = req.params.id;
  Interview_Basket.find({_id:id}).populate('userId')
  .then((interviews)=>{
    console.log(interviews);
    res.render('interviews/detail', {
      title: 'Interviews',
      interviews: interviews
    });
  }).catch(err => {console.log(err)})
};