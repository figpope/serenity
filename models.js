var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

if(process.env.MONGO_URL) {
	config.mongo.url = process.env.MONGO_URL;
} else { 
	config = require("./config");
}

var ClientSchema = new Schema ({
	name: String,
	ip: String,
	headphones: String,
	token: String
});

var ConferenceSchema = new Schema ({
	name: String,
	location: String,
	description: String,
	speaker: {type: Schema.Types.ObjectId, ref: 'Client'},
	attending: Number,
	questions: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

var PostSchema = new Schema ({
	question: String,
	client: {type: Schema.Types.ObjectId, ref: 'Client'},
	upvotes: Number,
	downvotes: Number,
	comments: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Client', ClientSchema);
mongoose.model('Conference', ConferenceSchema);
mongoose.model('Post', PostSchema);
var Client = mongoose.model('Client');
var Conference = mongoose.model('Conference');
var Post = mongoose.model('Post');