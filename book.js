
// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
var path = require('path');
const mongoose = require('mongoose');
const User = require('../models/users');
const Books = require('../models/books');
const multer = require('multer');
//import multipart from 'connect-multiparty';
//const upload=multer({dest:'uploads/'});
//const index=require('../index')
// //var User=require('../modrels/user');
// var user={
//   name:"Admin User",
//   email:"admin@SpeechGrammarList.com",
//   role:"admin"
// }
// User.create(user,function(e){
//   if(e){
//     throw e
//   }
// });

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });
// //const upload=multer({storage:storage});
// const books=require('../models/books');
// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

//  const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });


// router.post('/add', upload.single('image_url'), (req, res, next) => {
//   const book = new Books({
//     _id: new mongoose.Types.ObjectId(),
//     title: req.body.title,

//     description: req.body.description,

//     author:req.body.author,

//     publisher:req.body.publisher,

//     create_date:req.body.create_date,
//     image_url:req.file.path
//   });
//   book
//     .save()
//     .then(result => {
//       console.log(result);
//       res.status(201).json({
//         message: "Created product successfully",
//         createdProduct: {
//             title: req.result.title,

//             description:req.result.description,
        
//             author:req.result.author,
        
//           publisher:req.result.publisher,
        
//             create_date:req.result.create_date,
//             image_url:req.result.image_url,

//            // _id: result._id,
//             // request: {
//             //     type: 'GET',
//             //     url: "http://localhost:5000/products/" + result._id
//             // }
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });


// Adding a new book
router.post('/add', (req, res) => {
  const book = new Books({
    title: req.body.title,

    description: req.body.description,

    author:req.body.author,

    publisher:req.body.publisher,

    create_date:req.body.create_date,
    image_url:req.file.path


  });
  book.save().then(result => {
    res.send(result);
  }).catch(err =>{
    res.send(err);
  });
});

 
  router.get('/book', (req, res)=> {
  Books.find({user: req.params.id})
  .populate('book') 
  .then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  });
});
 module.exports = router;

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()) {
// 		return next();
//   }
//   req.session.oldUrl = req.url;
//   res.redirect('/user/login');
// }

// function notLoggedIn(req, res, next){
// 	if(!req.isAuthenticated()) {
// 		return next();
// 	}
//   res.redirect('/user/register');

  
// }
