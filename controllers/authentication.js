const bcrypt = require('bcryptjs');
const User = require('../models/user');


exports.getLogin = (req, res, next) => {
  res.render('authentification/login', {
    title: 'Login'
  });
};

exports.getSignup = (req, res, next) => {
    res.render('authentification/signup', {
      title: 'Register'
    });
  };


  exports.postLogin = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.redirect('/login');
      }
       bcrypt.compare(req.body.password, user.password)
       .then(doMatch => {
         if(doMatch){
           req.session.isLoggedIn = true;
           req.session.user = user;
           return req.session.save(err => {
             res.redirect('/');
           });
       }
        res.redirect('/login');
     })
     .catch(err => {
         res.redirect('/login');
       })
 }
 )}
 
 exports.postSignup = (req, res, next) => {
   const {email,password,confirmPassword,firstName,lastName} = req.body;
   User.findOne({email:email})
   .then(user=>{
       if(user){
         return res.redirect('/signup');
       }
       if(password!==confirmPassword){
         return res.redirect('/signup');
       }
       bcrypt.hash(password,12)
       .then(hashedPassword=>{
         const user = new User({
           email:email,
           password:hashedPassword,
           firstName:firstName,
           lastName:lastName,
           interview_basket:{interviews:[]}
         });
         return user.save();
       })
       .then(result=>{
         res.redirect('/login');
       })
   }).catch(err => console.log(err));
 };
 

 exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};