(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name timeTrackerApp.controller:timeTrackerCtrl
	 * @description
	 * # timeTrackerCtrl
	 * Controller of the timeTrackerApp
	 */
	angular.module('timeTrackerApp')
		.controller('timeTrackerCtrl', ['$scope', 'pageSettings', function ($scope, pageSettings) {
			$scope.pageSettings = pageSettings;
		}]);
})();
