'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/start', {templateUrl: 'partials/start.html', controller: StartCtrl});
	$routeProvider.when('/m/:meetingID', {templateUrl: 'partials/meeting.html', controller: MeetingCtrl});
	$routeProvider.otherwise({redirectTo: '/start'});
}]);