// var express = require('express');
// var router = express.Router();
// var csrf = require('csurf');
// var passport = require('passport');
// var Order = require('../models/order');
// var Cart = require('../models/cart');
// var Cart = require('../models/user');

// var csrfProtect = csrf();
// router.use(csrfProtect);

// router.get('/profile', isLoggedIn, function(req, res, next) {
// 	Order.find({user:req.user}, function(err, orders){
// 		if(err){
// 			return res.write('Error!');
// 		}
// 		var cart;
// 		orders.forEach(function(order){
// 			cart = new Cart(order.cart);
// 			order.items = cart.generateArray();
// 		});
// 		res.render('user/profile', { orders: orders });
// 	});
// });

// router.get('/logout', isLoggedIn, function(req, res, next) {
// 	req.logout();
// 	res.redirect('/');
// });

// router.use('/', notLoggedIn, function(req, res, next) {
// 	next();
// });

// router.get('/signup', function(req, res, next) {
// 	var messages = req.flash('error');
// 	res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
// });

// router.get('/signin', function(req, res, next) {
// 	var messages = req.flash('error');
// 	res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
// });

// router.post('/signup', passport.authenticate('local.signup', {
// 	failureRedirect: '/user/signup',
// 	failureFlash: true
// }), function(req, res, next){
// 	if(req.session.oldUrl){
// 		var oldUrl = req.session.oldUrl;
// 		req.session.oldUrl = null;
// 		res.redirect(oldUrl);
// 	}
// 	else{
// 		res.redirect('/user/profile');
// 	}
// });

// router.post('/signin', passport.authenticate('local.signin', {
// 	failureRedirect: '/user/signin',
// 	failureFlash: true
// }), function(req, res, next){
// 	if(req.session.oldUrl){
// 		vRar oldUrl = req.session.oldUrl;
// 		req.session.oldUrl = null;
// 		res.redirect(oldUrl);
// 	}
// 	else{
// 		res.redirect('/user/profile');
// 	}
// });

// module.exports = router;

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()) {
// 		return next();
// 	}
// 	res.redirect('/');
// }

// function notLoggedIn(req, res, next){
// 	if(!req.isAuthenticated()) {
// 		return next();
// 	}
// 	res.redirect('/');
// }

/*
 * This file handel all /api/user Routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcrypt');
//const auth =  require('../middleware/auth');
//const uuidv1 = require('uuid/v1');








//  Regastiration a new user
router.post('/register', (req, res) => {
  //  VALIDATION
//   res.send('hello');
  bcrypt.genSalt(10).then(salt => {
      console.log(req.body.password);
    bcrypt.hash(req.body.password, salt).then(hashed => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        password: hashed,
        email: req.body.email
      });
      user.save().then(result => {
        const token = jwt.sign({_id: result._id, exp: Date.now() + 1000 * 60 }, 'key');
        res.header({'x-auth-token': token}).send('New user has been added');
      }).catch(err => {
        res.send(err);
      })
    })
  });

});

// Done
router.post('/checKlogin', (req, res) => {
  //  check if there is a token
  const token = req.headers.token;
  if(token){
  //  decode the token and chekc if it's validate
    try {
      //  Get the payload from the jsonwebtoken
      let payload = jwt.verify(token, 'key');
      //  You can check the expiration if you want
      res.send('you are logged in');
    } catch (err) {
      res.status(400).send('invalid token you have to login');
    }
  }else{
    res.send('you need to login');
  }
});


router.post('/login', (req, res) => {
  //  check if there is a user data (username & password) in the req body
  const validating = userValidating(req.body);
  if(validating.error){
    res.status(400).send(validating.error);
  }else {
    //  chekc if there is such email get the user info
    User.findOne({email: req.body.email})
    .then(result => {
      //  check if the password valid
      bcrypt.compare(req.body.password, result.password, function(err, response) {
        if(response){
          const token = jwt.sign({ "_id": result._id }, 'key');
          res.header({'x-auth-token': token}).send('Done');
        }else{
          res.status(400).send('you have tried an incorect credentials');
        }
      });
    }).catch(err => {
      res.status(404).send('there is no such user');
    });
  }
  //  create a new token and send it back to the user in the response header
});


// Getting information
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(result => {
    if(!result){
      res.status(404).send('There is no such user');
    }
    res.send(result);
  }).catch(err => {
    res.status(400).send(err.message)
  })
});


// Adding a new User
router.post('/', (req, res) => {
  // Setting Schema so i can validate it
  const validating = userValidating(req.body);
  if(validating.error){
    res.status(400).send(validating.error);
  }else {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age
    });
    //  Checking the Mongoose Schema Validating
    const v = user.validateSync();
    // If the validateSync returns any string, that means that there is somthing wrong in saving the data
    if(v)
      res.status(400).send('There is somthing wrong');
    //  IF the above if didn't wokred then the program can contiue to the below lines
    user.save()
    .then(result => {
      //  IF the user saved in the database
      res.send('You hav\e added a new user');
      console.log(result);
    }).catch(err => {
      //  IF the user hasn't saved in the database
      res.status(401).send(err);
      console.log(err);
    });
  }
});


// PUT
router.put('/:id', (req, res) => {
  // If req.body is valid
  const validating = userValidating(req.body);
  //  If the validation fails
  if(validating.error){
    res.status(400).send(validating.error.details);
  }else {
    //  You can use updateMany
    User.updateOne( { _id: req.params.id },{ $set:req.body } )
    .then(result => {
      res.send(`Number of updated users is ${ result.n }`);
    }).catch(err => {
      res.status(400).send(err);
    });
  }
});


//  To validate' the POST PUT requestes
function userValidating(user) {
  const userSchema = {
    // 'name': Joi.string().min(3).required(),
    // 'age': Joi.number(),
    'email': Joi.string().min(3).required(),
    'password': Joi.string().min(3).required()
  };
  return Joi.validate(user, userSchema);
}


//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//       return next();
//   res.redirect('/login');
//   }
  
//   function isAdmin(req, res, next) {
//   if (req.isAuthenticated()) {
//       if (req.user.local.role == "admin") {
//           return next();
//       }
//   }
//   res.redirect('/login');
//   }