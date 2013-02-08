var express = require("express"),
	http = require('http'),
	path = require('path'),
	twilio = require("./routes/twilio"),
	questions = require("./routes/questions");

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('api/auth/tokenize', twilio.newToken);
app.get('api/audio/joinConference', twilio.joinConference);
app.get('api/audio/conferences', twilio.listConferences);
app.get('api/audio/newConference', twilio.startConference);
app.get('api/audio/unmute', twilio.unmute);
app.get('api/audio/confirm', twilio.confirm);
app.get('api/audio/mute', twilio.mute);
app.get('api/audio/status', twilio.state);
app.get('api/questions/list', questions.get);
app.get('api/questions/new', questions.add);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});