(function () {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name timeTrackerApp
	 * @description
	 * # timeTrackerApp
	 *
	 * Main module of the application.
	 */

	angular
		.module('timeTrackerApp', [
			'ngAnimate',
			'ngResource',
			'ngRoute',
			'ngSanitize',
			'ui.bootstrap'
		])
		.run(function (localStorage) {
			localStorage.initDefaults();
		});
})();
