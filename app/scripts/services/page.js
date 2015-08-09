(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name timeTrackerApp.service:pageSettings
	 * @description
	 * # pageSettings
	 */
	angular.module('timeTrackerApp')
		.service('pageSettings', function () {
			var service = {
				title: 'Time tracker'
			};
			return service;
		});
})();
