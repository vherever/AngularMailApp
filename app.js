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

	.controller('InboxCtrl', function InboxCtrl() {
		'use strict';
	
		
		this.title = "My Inbox"
	})
	.controller('EmailCtrl', function EmailCtrl() {
		this.title = "This is Email partial"
	})

	.factory('InboxFactory', function InboxFactory($q, $http) {
		'use strict';
		var exports = {};
		exports.messages = [];
		
		exports.getMessages = function() {
			var deferred = $q.defer();
			return $http.get('emails.json')
				.success(function(data) {
					exports.messages = data;
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject(data);
				});
				return deferred.promise;
		};

		return exports;
	})


//Directive allows us to use <inbox><inbox/> tags
	.directive('inbox', function InboxDirective() {
		'use strict';

		return {
			restrict: 'EA',
			replace: true,
			scope: true,
			templateUrl: 'partials/inbox.tmpl.html',
			controllerAs: 'inbox',

			controller: function(InboxFactory) {
				this.messages = [];

				InboxFactory.getMessages()
					.then(angular.bind(this, function() {
						this.messages = InboxFactory.messages;
					}) );
			},

			link: function(scope, element, attrs, ctrl) {

			}
		}
	});

	






















