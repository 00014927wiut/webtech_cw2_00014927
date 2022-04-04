const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user')
const errorController = require('./controllers/error');
const port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: "mongodb+srv://00014927:a.mirjalol@cluster0.tmolv.mongodb.net/course-work",
  collection: 'sessions'
});

const route_admin = require('./routes/admin');
const route_user = require('./routes/user');
const route_auth = require('./routes/authentication');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: '00014927_secretkey',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});


//setting routes
app.use('/admin', route_admin);
app.use(route_user);
app.use(route_auth);

//handling errors
app.use(errorController.getError);


mongoose
  .connect('mongodb+srv://00014927:a.mirjalol@cluster0.tmolv.mongodb.net/course-work')
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
});

