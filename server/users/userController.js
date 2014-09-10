'use strict';

// Import the database and the user model and collection for use
// in accessing the database for user login/signup.
var User = require('./userModel.js');
var jwt = require('jwt-simple');

// Here we hold all the methods that handle user login and signup.
module.exports = {

  // Method for handling requests for existing users. (GET)
  loginUser: function(req, res, next) {
    var email = req.query.email;
    var password = req.query.password;

    // Query user against the database to see if it is a registered user
    new User({ email: email })
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
              var token = jwt.encode(user, 'secret');
              res.json({token: token, user: user.get('first_name')});
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
    var email = req.body.email;
    var password = req.body.password;
    var first = req.body.first || null;
    var last = req.body.last || null;

    // Create a new database model for the user, email and password are
    // currently the only required fields. UserIDs are automatically
    // assigned by MySQL database.
    new User({ email: email })
      .fetch()
      .then(function(user) {
        // After querying the database to see if the user already exists
        // we can safely create and save a new instance if nothing is
        // returned under that users email address.
        if (!user) {
          var newUser = new User({
            email: email,
            password: password,
            first_name: first,
            last_name: last
          });
          newUser.save()
            .then(function(newUser) {
              // Add the user to the collection of users.
              // Send created response to trigger client application to
              // issue an authorization token.
              var token = jwt.encode(user, 'secret');
              res.json({token: token, user: newUser.get('first_name')});
            });
        } else {
          // Send bad request header and inform the client that the user
          // already exists.
          next('Account already exists');
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
