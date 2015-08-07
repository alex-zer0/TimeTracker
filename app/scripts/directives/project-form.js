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
				templateUrl: 'blocks/project-form.jade',
				link: function (scope) {
					scope.clickEvent = function ($event) {
						console.log($event);
					};
					scope.dateOptions = {
						format: 'MM/dd',
						isOpened: false,
						options: {
							startingDay: 1
						}
					};
					scope.projectOptions = {
						date: new Date()
					};
					scope.openCalendar = function ($event) {
						$event.preventDefault();
						$event.stopPropagation();
						console.log($event);
						scope.dateOptions.isOpened = true;
					};
				}
			};
		});
})();
