//mongodb://hawra:hhhh1234@>@ds237574.mlab.com:37574/bookstor

 
//  var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const usersRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const mongoose = require('mongoose');
//const helmet = require('helmet');
const compression = require('compression');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000
//hawra:hhhh1234@

//  Starting MongoDB connection
mongoose.connect('mongodb://hawra:hhhh1234@ds121089.mlab.com:21089/hanandata', { useNewUrlParser: true });

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...');
});


mongoose.connection.on('err', (err) => {
  console.log('\x1b[36m%s\x1b[0m', 'there is error');
});
//var User=require('/../path/to/user');
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
// MiddleWare
app.use(express.json());
//  You have to use This MiddleWare to get the files
app.use(fileUpload());
// For serving images and other static data
// app.use('/uploads',express.static('uploads'));
// Route MiddleWare for any route that start with (/api/user)
app.use('/api/user', usersRoutes);
app.use('/api/book',bookRoutes);

// Home Router
app.get('/', (req, res) => {
  const token = jwt.sign({"name":"Hanan", "age": 24}, 'key');
  res.send(token);
});

//Starting the server
// app.listen(PORT, () => {
//   console.log(`Running on port ${PORT}`);
// });
 
app.listen(3000);
  console.log('Running on port' );
  