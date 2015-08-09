(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name timeTrackerApp.service:localStorage
	 * @description
	 * # localStorage
	 */
	angular.module('timeTrackerApp')
		.factory('localStorage', ['$window', function ($window) {
			var defaultWorkspaces = [
				{
					id: 1,
					title: 'Your workspace'
				}
			],
			service = {
				set: function (key, value) {
					$window.localStorage[key] = value;
				},
				get: function (key, defaultValue) {
					return $window.localStorage[key] || defaultValue;
				},
				setObject: function (key, value) {
					$window.localStorage[key] = JSON.stringify(value);
				},
				getObject: function (key) {
					if ($window.localStorage[key]) {
						return JSON.parse($window.localStorage[key]);
					}
					return [];
				},
				initDefaults: function () {
					if (angular.equals(this.getObject('workspaces'), [])) {
						this.setObject('workspaces', defaultWorkspaces);
					}
				}

			};
			return service;
		}]);
})();
