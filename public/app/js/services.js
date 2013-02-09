'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
	value('version', '0.1').
	factory('Connect', function($http) {
	var Connect = {};
	Connect.newConference = function($scope) {
		var data = {
			'name': $scope.newConferenceName,
			'location': $scope.location,
			'description': $scope.description,
			'speaker': false //$scope.speaker
		};
		$http.post('/api/audio/newConference', data).
			success(function(data, status, headers, config) {

			}).
			error(function(data, status, headers, config) {
				console.log("Connect#newConference error:" + status)
			});
	};
	Connect.tokenize = function(conferenceName) {
		var data = {
			'client': "js",
			'ip': "1.1.1.1",
			'headphones': true,
			'conference': conferenceName
		};
		$http.post('/api/audio/newConference', data).
			success(function(data, status, headers, config) {
				if (data &&  data.token) {
					Connect.currentToken = data.token;
				} else {
					console.log("No token")
				}
			}).
			error(function(data, status, headers, config) {
				console.log("Connect#tokenize error:" + status)
			});
	}
	Connect.connectConference = function() {
		var performConnection = function() {
			Twilio.Device.connect(function (conn) {
				console.log("Connected.");
			});
		};
		if (Connect.currentToken) {
			Twilio.Device.setup(Connect.currentToken);
			Twilio.Device.ready(function (device) {
				console.log("Connection ready.");
				performConnection();
			});

		} else {
			console.log("Connection failed, no token.")
		}
	};
	return Connect;
});