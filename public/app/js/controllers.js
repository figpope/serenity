'use strict';

/* Controllers */

function StartCtrl($scope, Connect) {
	$scope.newConference = function() {
		Connect.newConference($scope);
		Connect.tokenize($scope.newConferenceName);
	};
	$scope.joinConference = function() {
		Connect.tokenize($scope.conferenceName);
	};
}

function MeetingCtrl($scope, $routeParams) {
	//$routeParams.meetingID
}