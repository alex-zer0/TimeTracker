(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name timeTrackerApp.controller:ModalCreateProjectCtrl
	 * @description
	 * # ModalCreateProjectCtrl
	 * Controller of the timeTrackerApp
	 */
	angular.module('timeTrackerApp')
		.controller('ModalCreateProjectCtrl', function ($scope, $modalInstance, localStorage) {
			$scope.workspace = $scope.workspaces[0];
			$scope.confirm = function () {

				var projects = localStorage.getObject('projects');
				if (angular.equals(projects, {})) {
					projects = [];
				}
				projects.push({
					title: $scope.title,
					workspace: $scope.workspace
				});
				localStorage.setObject('projects', projects);
				$modalInstance.close('OK');
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('Cancel');
			};
		});
})();
