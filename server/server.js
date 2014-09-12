// This file starts the server and connects to the
// database.  Exporting the app and express methods
// allows us to defer to the middleware to handle
// all routing.

var express = require('express');

// Initialize the SQLite databases
var sql =require('../keys.js').sqlite3;
// var db = Bookshelf.initialize(sql);

// Defer to the locally hosted mongodb if a process
// variable is not defined.
var mongoose = require('mongoose');
var mongodb =require('../keys.js').mongodb;
var dbURL = mongodb;
mongoose.connect(dbURL);

var app = express();

// Middleware takes two arguments into the exported function
// both the app object returned from express, and the expres
// method itself.
require('./config/middleware.js')(app, express);

module.exports = app;