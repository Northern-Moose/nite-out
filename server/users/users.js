var db = require('../config/sqlDbSchema.js');
var User = require('./userModel.js');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;