var gulp = require('gulp'),
	watch = require('gulp-watch');
var less = require('gulp-less');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var browserify = require('browserify');
var debowerify = require('debowerify');
var tsify = require('tsify');
var uglifyJs = require('gulp-uglify');
var uglifyCss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var typedoc = require("gulp-typedoc");

var config = {
	bowerDir: __dirname + '/bower_components',
	applicationDir: __dirname + '/src',
	stylesDir: __dirname + '/styles',
	publicDir: __dirname + '/Release',
	bundleName: 'bundle.js',
	bundleNameMin: 'bundle.min.js'
};


// ====== APPLICATION


/**
 * Compile ts files to js and save result to public directory
 */
gulp.task('compile-js', function() {
	var bundler = browserify({
			basedir: config.applicationDir,
			debug: true
		})
		.add(config.applicationDir + '/index.ts')
		.plugin(tsify)
		.transform(debowerify);

	return bundler.bundle()
		.pipe(exorcist(config.publicDir + '/' + config.bundleName + '.map'))
		.pipe(source(config.bundleName))
		.pipe(gulp.dest(config.publicDir));
});


/**
 * Minify result js file
 */
gulp.task('uglify-js', ['compile-js'], function() {
	return gulp.src(config.publicDir + '/' + config.bundleName)
		.pipe(uglifyJs())
		.pipe(rename(config.bundleNameMin))
		.pipe(gulp.dest(config.publicDir));
});


// ====== STYLES


/**
 * Compile less styles to css and save result to public directory
 */
gulp.task('compile-css', function() {
	return gulp.src(config.stylesDir + '/index.less')
		.pipe(sourceMaps.init())
		.pipe(less({paths: [config.stylesDir]}))
		.pipe(rename('style.css'))                                                 
		.pipe(sourceMaps.write('.'))                                               
		.pipe(gulp.dest(config.publicDir));
});


/**
 * Minify result css file
 */
gulp.task('uglify-css', ['compile-css'], function() {
	return gulp.src(config.publicDir + '/style.css')
		.pipe(uglifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(config.publicDir));
});


//--------------------------------------
 
gulp.task("typedoc", function() {
    return gulp
        .src([config.applicationDir + "/**/*.ts"])
        .pipe(typedoc({
            // TypeScript options (see typescript docs) 
            module: "commonjs",
            target: "es5",
            includeDeclarations: true,
 
            // Output options (see typedoc docs) 
            out: "./docs",
            theme: "minimal",
 
            // TypeDoc options (see typedoc docs) 
            name: "Doodle Jump Game",
            ignoreCompilerErrors: false,
            excludeExternals: true,
            version: true
        }))
    ;
});

gulp.task('default', ['typedoc', 'uglify-css', 'uglify-js'], function () {

    gulp.watch(config.applicationDir + '/**/*', ['uglify-js']);

    gulp.watch(config.stylesDir  + '/**/*', ['uglify-css']);

    livereload.listen();

    nodemon({
		// the script to run the app
		script: 'server.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('server.js')
			.pipe(livereload());
	})

});


 