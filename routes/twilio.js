var mongoose = require('mongoose'),
	twilio = require('twilio'),
	models = require('../models');

if(process.env.ACCOUNT_SID) {
	config.twilio.accountSid = process.env.ACCOUNT_SID;
	config.twilio.authToken = process.env.AUTH_TOKEN;
	config.twilio.appSid = process.env.APP_SID;
	config.mongo.url = process.env.MONGO_URL;
} else { 
	config = require("../config");
}

mongoose.connect(config.mongo.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("   Connection to mongo database successful!"); });

var client = new twilio.RestClient('ACCOUNT_SID', 'AUTH_TOKEN');

exports.newToken = function(req, res) {
	var capability = new twilio.Capability(config.twilio.accountSid, config.twilio.authToken);
	capability.allowClientOutgoing(config.twilio.appSid);
};
exports.joinConference = function(req, res) {

};
exports.listConferences = function(req, res) {

};
exports.startConference = function(req, res) {
	res.writeHead(200);
	res.end();
};
exports.unmute = function(req, res) {

};
exports.confirm = function(req, res) {

};
exports.mute = function(req, res) {

};
exports.state = function(req, res) {

};