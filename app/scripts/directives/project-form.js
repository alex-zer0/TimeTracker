(function () {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name timeTrackerApp.directive:projectForm
	 * @description
	 * # projectForm
	 */
	angular.module('timeTrackerApp')
		.directive('projectForm', ['$modal', 'localStorage', 'dateHelper', '$filter', '$interval',
			function ($modal, localStorage, dateHelper, $filter, $interval) {
				return {
					restrict: 'C',
					link: function (scope) {

						function saveTask() {
							if (angular.equals(scope.tasks, {})) {
								scope.tasks = [];
							}
							scope.projectOptions.time.stop =
								dateHelper.interval(scope.projectOptions.time.start, scope.projectOptions.time.value);
							scope.tasks.push({
								id: scope.tasks.length + 1,
								description: scope.projectOptions.descr,
								project: angular.copy(scope.projectOptions.project),
								price: scope.projectOptions.price,
								date: scope.projectOptions.date,
								time: angular.copy(scope.projectOptions.time)
							});
							localStorage.setObject('tasks', scope.tasks);
							scope.projectOptions.time = {
								value: $filter('timeFilter')(0)
							};
						}

						function updateProjectsList() {
							scope.projects = $filter('searchProjectsFilter')(localStorage.getObject('projects'), scope.searchOptions.text);
						}

						var intervalTemp;
						scope.projects = localStorage.getObject('projects');
						scope.tasks = localStorage.getObject('tasks');
						scope.dateOptions = {
							format: 'MM/dd',
							isOpened: false,
							options: {
								startingDay: 1
							}
						};

						scope.projectOptions = {
							date: new Date(),
							price: '12300',
							descr: '',
							project: {
								title: 'SELECT PROJECT',
								flag: false
							},
							time: {
								value: '00:00:00'
							},
							isStarted: false,
							isSaveMod: false,
							state: 'Start'
						};

						scope.searchOptions = {
							text: ''
						};

						scope.$watch('searchOptions', updateProjectsList, true);

						scope.setProject = function ($index) {
							scope.projectOptions.project.title = scope.projects[$index].title;
							scope.projectOptions.project.flag = true;
						};

						scope.toggleTimer = function () {
							if (scope.projectOptions.isSaveMod) {
								saveTask();
								return;
							}
							if (scope.projectOptions.isStarted) {
								$interval.cancel(intervalTemp);
								scope.projectOptions.isStarted = false;
								scope.projectOptions.state = 'Start';
								saveTask();
							} else {
								scope.projectOptions.time.start = dateHelper.getCurrentTime();
								intervalTemp = $interval(function () {
									scope.projectOptions.time.value = dateHelper.updateTime(scope.projectOptions.time.value);
								}, 1000);
								scope.projectOptions.isStarted = true;
								scope.projectOptions.state = 'Stop';
							}
						};

						scope.openCalendar = function ($event) {
							$event.preventDefault();
							$event.stopPropagation();
							scope.dateOptions.isOpened = true;
						};

						scope.openTime = function () {
							if (!scope.projectOptions.time.start) {
								scope.projectOptions.time.start = dateHelper.getCurrentTime();
							}
							if (!scope.projectOptions.time.stop) {
								scope.projectOptions.time.stop = dateHelper.getCurrentTime();
							}
						};

						scope.updateInterval = function ($event) {
							var intervalTemp = dateHelper.getInterval(scope.projectOptions.time.start, scope.projectOptions.time.stop);
							if (!$event || $event.keyCode === 13) {
								if (intervalTemp > 0) {
									scope.projectOptions.time.value = $filter('timeFilter')(intervalTemp * 60);
									scope.projectOptions.isSaveMod = true;
									scope.projectOptions.state = 'Save';
								} else {
									scope.projectOptions.time.start = scope.projectOptions.time.stop;
									scope.projectOptions.time.value = $filter('timeFilter')(0);
									scope.projectOptions.isSaveMod = false;
									scope.projectOptions.state = 'Start';
								}
							}
						};

						scope.updateTime = function ($event) {
							if (!$event || $event.keyCode === 13) {
								scope.projectOptions.time.value = $filter('timeFilter')(scope.projectOptions.time.value);
								scope.projectOptions.time.stop =
									dateHelper.interval(scope.projectOptions.time.start, scope.projectOptions.time.value);
								if (scope.projectOptions.time.value === '00:00:00') {
									scope.projectOptions.isSaveMod = false;
									scope.projectOptions.state = 'Start';
								} else {
									scope.projectOptions.isSaveMod = true;
									scope.projectOptions.state = 'Save';
								}
							}
						};

						scope.createProject = function () {
							var modalInstance,
									modalScope;
							modalScope = scope.$new();
							modalScope.workspaces = localStorage.getObject('workspaces');
							modalInstance = $modal.open({
								animation: true,
								templateUrl: 'modal-create-project.html',
								controller: 'ModalCreateProjectCtrl',
								scope: modalScope
							});

							modalInstance.result.then(function () {
								scope.projects = localStorage.getObject('projects');
							}, function () {
								console.log('Modal dismissed at: ' + new Date());
							});
						};

					}
				};
		}]);
})();
