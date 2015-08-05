gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
gutil        = require 'gulp-util'
gulpif       = require 'gulp-if'
concat       = require 'gulp-concat'
uglify       = require 'gulp-uglify'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'scripts', ->
	gulp.src [
			'components/jquery/dist/jquery.min.js'
			'components/angular/angular.min.js'
			'components/angular-animate/angular-animate.min.js'
			'components/angular-bootstrap/ui-bootstrap.min.js'
			'components/angular-mocks/angular-mocks.min.js'
			'components/angular-resource/angular-resource.min.js'
			'components/angular-route/angular-route.min.js'
			'components/angular-sanitize/angular-sanitize.min.js'
			'components/svg4everybody/svg4everybody.min.js'
			'components/bootstrap/dist/js/bootstrap.min.js'
			'app/scripts/common.js'
			'app/scripts/controllers/time-tracker.js'
			'app/scripts/directives/project-form.js'
		]
		.pipe plumber errorHandler: errorHandler
		.pipe concat 'common.min.js'
		.pipe gulpif !gutil.env.debug, uglify()
		.pipe gulp.dest paths.scripts
