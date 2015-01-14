angular.module('MailApp', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/inbox', {
				templateUrl: 'partials/inbox.html',
				controller: 'InboxCtrl',
				controllerAs: 'inbox'
			})
			.when('/inbox/email/id', {
				templateUrl: 'partials:/email.html',
				controller: 'EmailCtrl',
				controllerAs: 'email'
			})
			.otherwise({
				redirectTo: '/inbox'
			});
	})

	.controller('InboxCtrl', function InboxCtrl(InboxFactory) {
		'use strict';
		InboxFactory.getMessages().success(function(data) {
			debugger;
		});
		this.title = "My Inbox"
	})
	.controller('EmailCtrl', function EmailCtrl() {
		this.title = "This is Email partial"
	})

	.factory('InboxFactory', function InboxFactory($http) {
		'use strict';
		var exports = {};
		exports.messages = [];
		
		exports.getMessages = function() {
			return $http.get('emails.json');
		}

		return exports;
	});

	






















