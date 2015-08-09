(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name timeTrackerApp.service:dateHelper
	 * @description
	 * # dateHelper
	 */
	angular.module('timeTrackerApp')
		.service('dateHelper', function () {
			var service = {
				getCurrentTime: function () {
					var date = new Date(),
						current_hour = date.getHours(),
						current_minutes = date.getMinutes();
					if (current_hour < 10) {
						current_hour = '0' + current_hour;
					}
					if (current_minutes < 10) {
						current_minutes = '0' + current_minutes;
					}
					return current_hour + ':' + current_minutes;
				},
				interval: function (time, duration) {
					var timeArray = time.split(':');
					duration = duration.split(':');

					timeArray[0] = Number(timeArray[0]) + Number(duration[0]);
					timeArray[1] = Number(timeArray[1]) + Number(duration[1]);

					if (timeArray[1] > 59) {
						timeArray[0]++;
						timeArray[1] -= 60;
					}
					if (timeArray[1] < 10) {
						timeArray[1] = '0' + String(timeArray[1]);
					}
					return timeArray.join(':');
				},
				getInterval: function (start, stop) {
					start = start.split(':');
					stop = stop.split(':');
					var startTime = Number(start[0]) * 60 + Number(start[1]),
							stopTime = Number(stop[0]) * 60 + Number(stop[1]);
					return stopTime - startTime;
				},
				updateTime: function (time) {
					var timeArray = time.split(':');
					timeArray[2]++;
					if (timeArray[2] > 59) {
						timeArray[2] = '00';
						timeArray[1]++;
					}
					if (timeArray[1] > 59) {
						timeArray[1] = '00';
						timeArray[0]++;
					}
					timeArray.forEach(function (item, index) {
						if (Number(item) < 10) {
							timeArray[index] = '0' + Number(item);
						}
					});
					return timeArray.join(':');
				}
			};
			return service;
		});

})();
