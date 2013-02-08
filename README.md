serenity
========

A distributed PA system, powered by your mobile phones.

How To Use
==========

A speaker starting a conference places posts to `newConference`, then uses `tokenize` with the name of the conference they just added. Subsequent clients will join the conference with a call to `tokenize`.

The speaker posts to `unmute` with the name of the client to be unmuted, then the client confirms by placing a call to `confirm`, then the server unmutes them. When the client is finished speaking, the speaker posts to `mute`, muting the client through the server.

API Info
========

The api accepts GET and POST requests in JSON format, as specified below. This specification also includes internal methods, not meant to be called from the client.

Authentication
==============

Get Token
---------

* `POST /api/auth/tokenize` Get a capability token for a device being added to a conference

#### Request
```json
{
	"client": "<client name>",
	"ip": "<your ip>",
	"headphones": "<true | false>",
	"conference": "<conference name string>"
}
```
#### Response
```json
{
	"token": "<token string>"
}
```

Audio
=====

Start Conference
----------------

* `POST /api/audio/newConference` Starts a new conference

#### Request
```json
{
	"name": "<conference name>",
	"location": "<conference location>",
	"description": "<a brief description of the conference>",
	"speaker": "<client who started the conference>"
}
```

Join Conference (internal)
--------------------------

* `POST /api/audio/joinConference` Gets the TwiML that's returned to Twilio to connect the client

#### Request

Refer to http://www.twilio.com/docs/api/twiml/twilio_request#request-parameters-call-status for call statuses

```json
{
	"CallSid": "<unique call identifier>",
	"AccountSid": "<twilio account id>",
	"From": "<client name or phone number>",
	"To": "<server name or phone number>",
	"CallStatus": "<value for status of call>",
	"ApiVersion": "<twilio api version used for call>",
	"Direction": "<direction of call, normally 'inbound'>"
}
```

#### Response
```XML
<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Dial>
		<Conference>
			muted="true",
			startConferenceOnEnter="false",
			endConferenceOnExit="false"
			Name of Conference
		</Conference>
	</Dial>
</Response>
```

List Conferences
----------------

* `GET /api/audio/conference` Gets a listing of available conferences, or details of a single conference

#### Request

Leave blank for a list, otherwise

```json
{
	"id": "<conference id>"
}
```

#### Response
```json
[
	{
		"id": "<conference id>",
		"name": "<conference name>",
		"location": "<physical location>",
		"description": "<a brief description of the conference>",
		"attendees": "<number of people attending>",
		"speaker": "<client name that started the conference>"
	}
	{
		"id": "<conference id>",
		"name": "<conference name>",
		"location": "<physical location>",
		"description": "<a brief description of the conference>",
		"attendees": "<number of people attending>",
		"speaker": "<client name that started the conference>"
	}
]
```

Unmute Client
-------------

* `POST /api/audio/unmute` Requests to unmute a specific client

#### Request
```json
{
	"clientid": "<client id number>"
}
```

#### Response
```json
{
	"status": "<accepted or rejected>"
}
```

Client Confirmation
-------------------

* `POST /api/audio/confirm` Confirms client's agreeing to being unmuted

#### Request
```json
{
	"client": "<name>",
	"status": "<accepted or rejected>"
}
```

Mute Client
-----------

* `POST /api/audio/mute` Requests to mute a specific client

```json
{
	"clientid": "<client id number>",
	"status": "<accepted or rejected>"
}
```

Call Status Logging (Internal)
------------------------------

* `POST /api/audio/status` Recieves status callback to update client status

#### Request
```json
{
	"CallDuration": "<duration of the call>",
	"RecordingUrl": "<the url of the audio>",
	"RecordingSid": "<the id of the recording>",
	"RecordingDuration": "<the length of the recording>"
}
```

Questions
=========

Get Questions
-------------

* `GET /api/questions/list` Returns a list of questions for a specific conference

#### Request

Fill in the speaker token to get client ids. Specifying an id will get a specific question, otherwise will return all questions.

```json
{
	"speaker": "<speaker token>",
	"id": "<question id>"
}
```

#### Response

A recursive structure with questions and comments on those questions.

```json
[
	{
		"id": "<post id>",
		"question": "<the post>",
		"client": "<name of the client>",
		"clientid": "<client id number>",
		"upvotes": "<upvotes on the post>",
		"downvotes": "<downvotes on the post>",
		"comments": [
			{
				"id": "<post id>",
				"comment": "<the post>",
				"client": "<client name>",
				"clientid": "<client id number>",
				"upvotes": "<upvotes on the post>",
				"downvotes": "<downvotes on the post>",
				"comments": "<etc>"
			}
		]
	}
]
```

Add Question
------------

* `POST /api/questions/add` Adds a question to the conference's Q/A list or a comment to a question

#### Request
```json
{
	"question": "<the post>",
	"client": "<name of the client>",
	"token": "<client token>",
	"parent": "<id of parent post / conference>"
}
```