var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {type: String, required: [true, "Username can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true, unique:true, minlength:3},
  email: {type: String, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true,unique:true},
  bio: String,
  image: String,
  hash: String,
  salt: String,
  token: {type: String,index: true},
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});


UserSchema.methods.setPassword = function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.updateToken = function(){
  let newToken = jwt.sign({username:this.username,email:this.email}, process.env.TOKEN_SECRET);
  this.token = newToken;
  return newToken;
}

UserSchema.methods.validToken = function(token) {
  return this.token === token;
};

// crypto.randomBytes(64).toString('hex');
module.exports = mongoose.model('User', UserSchema);