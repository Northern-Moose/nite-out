'use strict';

// Import the databse and the user model and collection for use
// in accessing the database for user login/signup.
var User = require('./userModel.js');
var Users = require('./users.js');
var jwt = require('jwt-simple');
var app = require('../server.js');
var express = require('express');

/************************************************************/
// Token Support 94103
/************************************************************/
var makeToken = function(user, username) {
  var payload = {
    user: username
  };
  var token = jwt.encode(payload, 'secret');
  res.json({token: token, zipcode: user.get(zipcode)});
};

// Here we hold all the methods that handle user login and signup.
module.exports = {

  // Method for handling requests for existing users. (GET)
  loginUser: function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;

    // Query user against the database to see if it is a registered user
    new User({ username: username })
      .fetch()
      .then(function(user) {
        if (!user) {
          // If the user does not exist, send back a bad request status.
          next('User does not exist');
        } else {
          // User exists, call method to compare the supplied password
          // against the one supplied by the user.
          user.comparePassword(password, function(match) {
            if (match) {
              // The password is a match, send back appropriate header
              // to client application, tokening will be handle by client.
              // CHANGE: send back username and zipcode for default loading
              makeToken(user, username);
              // var payload = {
              //   user: username
              // };
              // var token = jwt.encode(payload, 'secret');
              // res.json({token: token, zipcode: user.get(zipcode)});
            } else {
              // Unauthorized request status code sent back to client.
              next(new Error('Bad password'));
            }
          });
        }
    });
  },

  // Method for handling requests to signup new users. (POST)
  signupUser: function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var first = req.body.first || null;
    var last = req.body.last || null;

    // Create a new database model for the user, email and password are
    // currently the only required fields. UserIDs are automatically
    // assigned by MySQL database.

    new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        Users.create({
          username: username,
          email: email,
          password: User.hashPassword,
          first: first,
          last: last
        }).then(function(user) {
          makeToken(user, username);
          console.log("user: ", user);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
  },

  // Method for handling requests to edit user information. (PUT)
  editUser: function(req, res, next) {
    var email = req.body.email;
    var field = req.body.field;
    var value = req.body.value;

    new User({email: email})
      .fetch()
      .then(function(user) {
        user.set(field, value).save();
      });
    next('Changes made!');
  },

};
