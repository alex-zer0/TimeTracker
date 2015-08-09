(function () {
	'use strict';

	/**
	 * @ngdoc filter
	 * @name timeTrackerApp.filter:timeFilter
	 * @description
	 * # timeFilter
	 */
	angular.module('timeTrackerApp')
		.filter('timeFilter', function () {

			function getDotFormat(temp) {
				var timeArray = [];
				timeArray.push(Math.floor((temp) / 3600));
				timeArray.push(Math.floor((temp - timeArray[0] * 3600) / 60));
				timeArray.push(Math.floor(temp - timeArray[0] * 3600 - timeArray[1] * 60));

				timeArray.forEach(function (item, index) {
					if (item < 10) {
						timeArray[index] = '0' + item;
					}
				});
				return timeArray.join(':');
			}

			return function (input) {
				var timeArray = String(input).split(':');

				if (timeArray.length === 1) {
					return getDotFormat(Number(timeArray[0]));
				}

				if (timeArray.length === 2) {
					return getDotFormat(Number(timeArray[0]) * 60 + Number(timeArray[1]));
				}

				if (timeArray.length === 3) {
					return getDotFormat(Number(timeArray[0]) * 3600 + Number(timeArray[1]) * 60 + Number(timeArray[2]));
				}

				return '00:00:00';
			};
		});
})();
