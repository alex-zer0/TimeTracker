(function () {
	'use strict';

	/**
	 * @ngdoc filter
	 * @name timeTrackerApp.filter:searchProjectsFilter
	 * @description
	 * # searchProjectsFilter
	 */
	angular.module('timeTrackerApp')
		.filter('searchProjectsFilter', function () {
			return function (input, title) {
				var result = [];
				input.forEach(function (item) {
					if (item.title.indexOf(title) > -1) {
						result.push(item);
					}
				});
				return result;
			};
		});
})();
