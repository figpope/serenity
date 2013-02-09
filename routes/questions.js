var mongoose = require('mongoose'),
	models = require('../models');

if(process.env.MONGO_URL) {
	config.mongo.url = process.env.MONGO_URL;
} else { 
	config = require("../config");
}

mongoose.connect(config.mongo.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("   Connection to mongo database successful!"); });

exports.get = function (req, res) {

};

exports.add = function (req, res) {

};