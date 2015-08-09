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
			'components/jquery/dist/jquery.js'
			'components/angular/angular.js'
			'components/bootstrap/dist/js/bootstrap.js'
			'components/angular-bootstrap/ui-bootstrap-tpls.js'
			'components/angular-mocks/angular-mocks.js'
			'components/angular-resource/angular-resource.js'
			'components/angular-route/angular-route.js'
			'components/angular-animate/angular-animate.js'
			'components/angular-sanitize/angular-sanitize.js'
			'components/angular-touch/angular-touch.js'
			'components/svg4everybody/svg4everybody.js'
			'app/scripts/common.js'
			'app/scripts/controllers/time-tracker.js'
			'app/scripts/controllers/modal-create-project.js'
			'app/scripts/directives/project-form.js'
			'app/scripts/directives/task-template.js'
			'app/scripts/filters/time.js'
			'app/scripts/filters/search-projects.js'
			'app/scripts/services/local-storage.js'
			'app/scripts/services/date-helper.js'
			'app/scripts/services/page.js'
		]
		.pipe plumber errorHandler: errorHandler
		.pipe concat 'common.min.js'
		.pipe gulpif !gutil.env.debug, uglify()
		.pipe gulp.dest paths.scripts
