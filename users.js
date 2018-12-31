// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
 //var Schema = mongoose.Schema;

// var userSchema = new Schema({
// 	email: {type: String, required: true},
// 	password: {type: String, required: true}
// });

// userSchema.methods.encryptPassword = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
// };

// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);  
// };

// module.exports = mongoose.model('User', userSchema);
/*
 *  MONGO Table User Model
 *
 */

// Dependency
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  age: {
    type: Number,
    required: [true, 'Age Is Required']
  },
  name: {
    type: String,
    required: function () {
      return this.age > 3 ; 
    }
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
});
//  var user={
//     name:"Admin User",
//     email:"admin@SpeechGrammarList.com",
//     role:"admin"
//   }
//   user.create(user,function(e){
//     if(e){
//       throw e
//     }
//   });
module.exports = mongoose.model('User', userSchema);
