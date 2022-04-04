const mongoose = require('mongoose');
const User = require('../models/user');
const Interview_Basket = require('../models/interview_basket');

exports.getAllInterviews = (req, res, next) => {
       Interview_Basket.find({userId:req.user._id}).populate('userId')
       .then((user) => {
         console.log(user);
         if(!user){
            return res.redirect('/login');
         }
         res.render('admin/interviews', {
          title: 'My List',
          interviewList: user
        });
       })

};

exports.getShareExperience = (req, res, next) => {
    res.render('admin/share', {
      title: 'Share Experience',
      editing: false,
      interview:null
    });
};

exports.getEditInterview = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const id = req.params.id;
  Interview_Basket.findById(id).populate("userId")
    .then(interview => {
      if (!interview) {
        return res.redirect('/');
      }
      console.log(interview);
      res.render('admin/share', {
        title: 'Edit Interview',
        path: '/admin/share',
        editing: editMode,
        interview: interview
      });
    })
    .catch(err => {
       console.log(err)
    });
};



exports.postShareExperience = (req, res, next) => {
  const question1 = req.body.question1;
  const question2 = req.body.question2;
  const question3 = req.body.question3;
  const answer1   = req.body.answer1;
  const answer2   = req.body.answer2;
  const answer3   = req.body.answer3;
  const userId    = req.session.user._id;
  const recommendation = req.body.recommendation;
  const status = req.body.status  === "false"? false : true;
  const course = req.body.course
  const university = req.body.university

  
  const basket = new Interview_Basket({question1,question2,question3,answer1,answer2,answer3,userId,recommendation,status,course,university})
  basket.save().then(()=>{
     return res.redirect("/admin/interviews");
  }).catch(err=>console.log(err))
}  


exports.deleteInterviewExperience = (req, res, next)=>{
  const id = req.body.interviewId;
  Interview_Basket.findByIdAndRemove(id).then(()=>{
    return res.redirect("/admin/interviews");
  }).catch(err=>console.log(err))
}

exports.postEditInterview = (req, res, next) => {
  const id = req.body.id;
  const question3 = req.body.question3;
  const question1 = req.body.question1;
  const question2 = req.body.question2;
  const answer3 = req.body.answer3;
  const answer2 = req.body.answer2;
  const answer1 = req.body.answer1;
  const university = req.body.university;
  const course = req.body.course;
  const recommendation = req.body.recommendation;
  const status = req.body.status  === "false"? false : true;

  Interview_Basket.findById(id)
    .then(interview => {
      if (interview.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      interview.question3 = question3;
      interview.question1 = question1;
      interview.question2 = question2;
      interview.answer3 = answer3;
      interview.answer2 = answer2;
      interview.answer1 = answer1;
      interview.university = university;
      interview.course = course;
      interview.recommendation = recommendation;
      interview.status = status;

      return interview.save().then(result => {
        res.redirect('/admin/interviews');
      });
    })
    .catch(err => console.log(err));
};