(function () {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name timeTrackerApp.directive:projectForm
	 * @description
	 * # projectForm
	 */
	angular.module('timeTrackerApp')
		.directive('projectForm', function () {
			return {
				restrict: 'C',
				link: function (scope) {
					scope.clickEvent = function ($event) {
						console.log($event);
					};
					console.log(scope.pageSettings.title);
				}
			};
		});
})();
