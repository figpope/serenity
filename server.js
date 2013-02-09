var express = require('express'),
	http = require('http'),
	io = require('socket.io'),
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

var server = http.createServer(app);
io = io.listen(server);

io.configure(function () {
	io.set('authorization', function(handshakeData, callback) {
		if (handshakeData.xdomain) {
			callback('Cross-domain connections are not allowed');
		} else {
			callback(null, true);
		}
	});
});

server.listen(app.get('port'), function () {
	console.log("   Server listening on port " + app.get('port'));
})

app.post('api/auth/tokenize', twilio.newToken);
app.post('api/audio/joinConference', twilio.joinConference);
app.get('api/audio/conference', twilio.listConferences);
app.post('api/audio/newConference', twilio.startConference);
app.post('api/audio/unmute', twilio.unmute);
app.post('api/audio/confirm', twilio.confirm);
app.post('api/audio/mute', twilio.mute);
app.post('api/audio/status', twilio.state);
app.get('api/questions/list', questions.get);
app.post('api/questions/new', questions.add);
