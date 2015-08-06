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
		.controller('timeTrackerCtrl', function ($scope) {
			$scope.pageSettings = {
				title: 'Time Tracker'
			};
		});
})();
