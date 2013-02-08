var express = require("express"),
	routes = require("./routes/twilio");

var app = express();

app.get("/", function(req, res) {

});

app.listen(3000);
console.log('Listening on port 3000...')