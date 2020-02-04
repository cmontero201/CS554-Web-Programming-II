const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = [
    './src/styles/variables.scss',
    './src/styles/custom.scss',
    './node_modules/bootstrap/scss/_variables.scss'
];

const vendorJsFiles = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.js'
];

// GULP SASS FILES
gulp.task('sass', function(done) {  // Takes in string name for task cmd
    gulp
        .src(sassFiles) // Set source files to be specified files in sassFiles array
        .pipe(gulpSASS())   // Pass sassFiless arr and compile to csss
        .pipe(concatenate('styles.css'))    // After sassFiles are compiles to css, concatenate to one file named styles.css
        .pipe(gulp.dest('./public/css'))    // Set saving destination for compiled and concactenated sassFiles
        .pipe(autoPrefix())     // Add prefixes for browsers
        .pipe(cleanCSS())   // Minify compiled and concatened sassFiles
        .pipe(rename('styles.min.css'))      // Rename minifed file to styles.min.css
        .pipe(gulp.dest('./public/css'));    // Set saving destination for Minified file
    done();     // Signifies task is completed
});

// GULP VENDOR JS FILES
gulp.task('js:vendor', function(done) {
    gulp
        .src(vendorJsFiles)     // Set source of files to be specified files in vendorJsFiles array
        .pipe(concatenate('vendor.min.js'))   // Concatenate vendor files into one file named vendor.min.js
        .pipe(gulp.dest('./public/js/'));   // Set saving destination for concatenated vendor files
    done();
});

gulp.task('build', gulp.parallel( ['sass', 'js:vendor'] ));     // Runs all specified tasks in parallel

// Watch for changes in specified files (auto compiles and runs tasks)
gulp.task('watch', function(done) {
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
});

// Default Task (just type gulp cmd)
gulp.task('default', gulp.series('watch'));