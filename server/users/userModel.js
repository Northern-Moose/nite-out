'use strict';

// Defining the user model and attaching several methods
// which handle password checking for existing users and
// hashing when registering new users.
var db = require('../config/sqlDbSchema.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  // Define the table to which the model belongs to (for Schema)
  tableName: 'users',
  hasTimestamps: false,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), 
      function(err, isMatch) {
        callback(isMatch);
      });
    // var isMatch = bcrypt.compareSync(attemptedPassword, this.get('password'));
    // console.log("isMatch: ", isMatch);
    // callback(isMatch);  
  },
  hashPassword: function()  {
    var cipher = Promise.promisify(bcrypt.hash);

    var salt = bcrypt.genSaltSync(10);
    // the genSaltSync, is not occuring fast enough to be 
    // passed into the return function below
    // return a promise - bookshelf will wait for the promise
    // to resolve before completing the create action
    // return cipher(10, function(err, salt) {
    //   password = this.get('password');
    //   bcrypt.hash(password, salt, null)
    //     .bind(this)
    //     .then(function(hash) {
    //       this.set('password', hash);
    //     });
    // })

    return cipher(this.get('password'), salt, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});




// Export the user model for use elsewhere.
module.exports = User;
