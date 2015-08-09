(function () {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name timeTrackerApp.directive:taskTemplate
	 * @description
	 * # taskTemplate
	 */
	angular.module('timeTrackerApp')
		.directive('taskTemplate', ['$modal', 'localStorage', 'dateHelper', '$filter', '$timeout',
			function ($modal, localStorage, dateHelper, $filter, $timeout) {
				return {
					restrict: 'C',
					link: function (scope, element) {
						scope.descrEdit = function ($index) {
							scope.tasks[$index].editDescr = true;
							$timeout(function () {
								element.find('.task-template__description--editor')[0].focus();
							}, 100);
						};

						scope.descrEditCancel = function ($index, $event) {
							if (!$event || $event.keyCode === 13) {
								scope.tasks[$index].editDescr = false;
								localStorage.setObject('tasks', scope.tasks);
							}
						};

						scope.setTitle = function ($index, $parentIndex) {
							scope.tasks[$index].project.title = scope.projects[$parentIndex].title;
							scope.tasks[$index].project.flag = true;
							localStorage.setObject('tasks', scope.tasks);
						};

						scope.updateInterval = function ($index, $event) {
							var intervalTemp = dateHelper.getInterval(scope.tasks[$index].time.start, scope.tasks[$index].time.stop);
							if (!$event || $event.keyCode === 13) {
								if (intervalTemp > 0) {
									scope.tasks[$index].time.value = $filter('timeFilter')(intervalTemp * 60);
								} else {
									scope.tasks[$index].time.start = scope.tasks[$index].time.stop;
									scope.tasks[$index].time.value = $filter('timeFilter')(0);
								}
								localStorage.setObject('tasks', scope.tasks);
							}
						};

						scope.updateTime = function ($index, $event) {
							if (!$event || $event.keyCode === 13) {
									scope.tasks[$index].time.value = $filter('timeFilter')(scope.tasks[$index].time.value);
									scope.tasks[$index].time.stop =
										dateHelper.interval(scope.tasks[$index].time.start, scope.tasks[$index].time.value);
									localStorage.setObject('tasks', scope.tasks);
							}
						};

						scope.start = function ($index) {
							scope.projectOptions.descr = scope.tasks[$index].description;
							scope.projectOptions.project = angular.copy(scope.tasks[$index].project);
							scope.projectOptions.price = scope.tasks[$index].price;
							scope.projectOptions.time = {
								value: '00:00:00'
							};
							scope.toggleTimer();
						};
					}

				};
			}]);
})();
