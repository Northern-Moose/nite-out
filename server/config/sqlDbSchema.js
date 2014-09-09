'use strict';

// Setup our connection to the MySQL database
// that handles our user data.  
var sql = require('../../keys.js').sqlite3;

// Setup our connection to the SQLite database
// that handles our user data.
var Bookshelf = require('bookshelf');
var db = Bookshelf.initialize(sql);

/************************************************************/
// Content aggregation tables
/************************************************************/
// User Login tables
db.knex.schema.hasTable('users').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('user_id').primary();
      user.string('username', 50).unique();
      user.string('email', 200).unique();
      user.string('password', 200);
      user.string('first', 75);
      user.string('last', 75);
      user.string('zipcode');
    }).then(function(table) {
      console.log('Created Users Table', table);
    });
  }
});

// EventType Table
db.knex.schema.hasTable('eventType').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('eventType', function(eventName) {
      eventName.increments('event_id').primary();
      eventName.string('eventType', 50).unique();
    }).then(function(table) {
      console.log('Created EventType', table);
    });
  }
});

// Movies Table
db.knex.schema.hasTable('movies').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('movies', function(movie) {
      movie.increments('movie_id').primary();
      movie.string('movieName', 200).unique();
      movie.string('theaterName', 200);
      movie.integer('zipcode');
    }).then(function(table) {
      console.log('Created Movies', table);
    });
  }
});

// Concert Table
db.knex.schema.hasTable('concerts').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('concerts', function(concert) {
      concert.increments('concert_id').primary();
      concert.string('perfomance', 200).unique();
      concert.string('venue', 200);
      concert.integer('zipcode');
    }).then(function(table) {
      console.log('Created Concerts', table);
    });
  }
});

// Restaurant Table
db.knex.schema.hasTable('restaurants').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('restaurants', function(restaurant) {
      restaurant.increments('restaurant_id').primary();
      restaurant.string('restaurantName', 200).unique();
      restaurant.integer('zipcode');
    }).then(function(table) {
      console.log('Created restaurants', table);
    });
  }
});

// Sports Table
db.knex.schema.hasTable('sports').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('sports', function(sport) {
      sport.increments('sport_id').primary();
      sport.string('eventName', 200).unique();
      sport.string('venue', 200);
      sport.integer('zipcode');
    }).then(function(table) {
      console.log('Created Sports', table);
    });
  }
});

// Purchase History Table
db.knex.schema.hasTable('purchaseHistory').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('purchaseHistory', function(purchase) {
      purchase.increments('purchase_id').primary();
      purchase.integer('buyer').unsigned().references('user_id').inTable('users');
      purchase.integer('eventType_id').references('event_id').inTable('eventType');
      purchase.integer('eventKey');
    }).then(function(table) {
      console.log('Created Purchase History', table);
    });
  }
});

module.exports = db;