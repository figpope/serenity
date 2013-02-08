var redis = require("redis-url").connect(process.env.MYREDIS_URL | "redis://localhost:6379"),
	twilio = require('twilio');

var config = {};
var appSid = 'AP5a71e578c91a0498b0c0fd3590d1dce3';

if(process.env.ACCOUNT_SID) {
	config.accountSid = process.env.ACCOUNT_SID;
	config.authToken = process.env.AUTH_TOKEN;
} else { 
	config = {
		accountSid: 'AC789b4cd68055461194fb113706956989',
		authToken: '73cd8dd8081437d3c4a77e096c5cb8ce'
	};
}

var client = new twilio.RestClient('ACCOUNT_SID', 'AUTH_TOKEN');

exports.newToken = function(req, res) {

};
exports.joinConference = function(req, res) {

};
exports.listConferences = function(req, res) {

};
exports.startConference = function(req, res) {

};
exports.unmute = function(req, res) {

};
exports.confirm = function(req, res) {

};
exports.mute = function(req, res) {

};
exports.state = function(req, res) {

};