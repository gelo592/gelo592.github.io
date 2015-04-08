'use strict';

/* Grunt Modules and Commands
 * ==========================================================================
 * STYLE: Grunt modules are listed in alphabetical order.  The commands
 *        for each task are broken up into *common* and *app specific* sections
 *        (where appropriate) but otherwise are also listed alphabetically.
 */

module.exports = function(grunt) {
  // load grunt modules
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')

/* Module: Clean
 * ------------------------------------------------------
 * [Docs](https://www.npmjs.org/package/grunt-contrib-clean)
 *
 * Remove all files in the specified folders.
 *
 * ### Commands ###
 *
 *   * `grunt clean` - Run all clean commands (below).
 *   * `grunt clean:build` - Empty the `build/` directory, except for hidden
 *     files.
 */
    , clean: {
        build: ['build/*', '!build/**/.gitkeep']
      }


/* Module: Concat
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-concat)
 *
 * Concatenate files from `src/` into a single app level file in `build`.  Each
 * command may target a subset of `src/`.  Using a single file in production
 * means less requests are made when loading a page's resources.
 *
 * A `'use strict';` statement is appended to the top of the output file, so
 * each individual source code file should not include it.
 *
 * ### Commands ###
 *
 *   * `grunt concat` - Run all concat commands (below).
 *   * `grunt concat:js` - Concatenate js files into a single build file.
 */
    , concat: {
          js: {
              options: {
                  banner: "'use strict';\n\n" +
                          " * ============================================================================= */\n\n"
                , separator: '\n\n'
                , footer: '\n'
              }
            , src: [
                  // general include
                  'src/js/**/*.js'
              ]
            , dest: 'build/js/main.js'
            , nonull: true
          }
      }


/* Module: Copy
 * ------------------------------------------------------
 * [Docs](https://www.npmjs.org/package/grunt-contrib-copy)
 *
 * Copy files and folders.
 *
 * ### Commands ###
 *
 *   * `grunt copy` - Run all copy commands (below).
 *   * `grunt copy:download` - Copy downloadable files to build.
 *   * `grunt copy:img` - Copy images to build.
 *   * `grunt copy:lib` - Copy library files to build.
 *   * `grunt copy:pages` - Copy website pages to build.
 */
    , copy: {
          download: {
              expand: true
            , cwd: 'src/download/'
            , src: './**'
            , dest: 'build/download/'
          }
        , img: {
              expand: true
            , cwd: 'src/img/'
            , src: './**'
            , dest: 'build/img/'
          }
        , lib: {
              expand: true
            , cwd: 'src/lib/'
            , src: './**'
            , dest: 'build/lib/'
          }
        , pages: {
            files: [
                {
                    expand: true
                  , cwd: 'src/'
                  , src: './*'
                  , filter: 'isFile'
                  , dest: 'build/'
                }
            ]
          }
        , js: {
            files: [
            {
                expand: true
              , cwd: 'src/js/'
              , src: './schedule-viewer.js'
              , dest: 'build/js/'
            }
          ]
        }
      }

/* Module: jsHint
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-jshint)
 * [jsHint Options](http://www.jshint.com/docs/options/)
 *
 * Lint javascript files for errors.
 *
 * NOTE: In all cases, 3rd party files (lib) and minimized files (.min.js) are
 *       excluded from linting.  3rd party js files often have different style
 *       guidelines and minimized files don't have any style by definition,
 *       thus both have a tendency to cause jsHint errors.
 *
 * The commands are setup to be inclusive, so that a file should be linted by
 * default unless it is in pre-approved section (ie a library).
 *
 * ### Commands ###
 *
 *   * `grunt jshint` - Run all jshint commands (below).  `grunt jshint:all` is
 *      prefered.
 *   * `grunt jshint:all` - Lint all js files, including those in the project's
 *      root (like `Gruntfile.js`).
 *   * `grunt jshint:build` - Lint `build/`.
 *   * `grunt jshint:source` - Lint `src/`.
 *   * `grunt jshint:test` - Lint `test/`.
 */
    , jshint: {
          // global options
          options: {
              // options here to override JSHint defaults
              // http://www.jshint.com/docs/options/

              // turn on warnings
              // true = on, false = off
              // http://www.jshint.com/docs/options/#enforcing-options
              bitwise: true
            , curly: true
            , forin: true
            , freeze: true
            , immed: true
            , indent: false
            , latedef: true
            , newcap: true
            , noarg: true
            , noempty: true
            , nonew: true
            , quotmark: false
            , strict: false
            , undef: true
            , unused: false
            , trailing: true

              // turn off warnings
              // true = off, false = on
              // http://www.jshint.com/docs/options/#relaxing-options
            , globalstrict: true
            , laxbreak: true
            , laxcomma: true
            , shadow: true

              // environments
              // declares variables that will exist in the global scope
              // http://www.jshint.com/docs/options/#environments
            , browser: true
            , devel: true
            , jquery: true

              // set global vars
              // turns off warnings for varialbes defined in the global scope:
              //   * true = warning on
              //   * false = warning off
            , globals: {
                  "rs": false            // ReSchedule (us!)

                , "analytics": false     // segment.io

                , "randomColor": false   // randomColor lib

                , "moment": false        // moment time lib

                , "afterEach": false     // jasmine
                , "beforeEach": false
                , "describe": false
                , "expect": false
                , "it": false
                , "jasmine": false
                , "spyOn": false

                , "module": false        // Gruntfile.js
                , "require": false

                , "_": false             // underscore.js
                , "Handlebars" : false
                , "Firebase" : false
                , "Promise" : false
              }
          }

          // commands
        , all: {
            src: [
                // generally include
                '**/*.js'

                // except 3rd party and minified files
              , '!node_modules/**/*.js'
              , '!src/lib/**/*.js'
              , '!build/lib/**/*.js'
              , '!**/*.min.js'
              , '!build/js/templates.js'

                // but specifically include these
                // ex: `src/lib/myCustomLibComponent/ohYeah.js`
            ]
          }
     }

/* Module: SASS
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-sass)
 *
 * Compile SASS and SCSS files into CSS.
 *
 * Use SASS [@import](sass_import) to include files into an app level file,
 * which will then be converted to SCSS. This behaviour is different than that
 * of the js, which gets concatenated into an app level file in the build task.
 * However, imports are baked into SASS and can be used to group related styles.
 *
 * [sass_import]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import
 *
 * ### Commands ###
 *
 *   * `grunt sass` - Run all SASS commands (below).
 *   * `grunt sass:stylin` - Compile styles.
 *   * `grunt sass:stylin_min` - Compile styles and minify them.
 */
    , sass: {
          stylin: {
              files: [{
                  expand: true
                , cwd: 'scss'
                , src: ['*.scss']
                , dest: 'css'
                , ext: '.css'
              }]

            , options: {
                style: 'nested'
              }
          }
        , stylin_min: {
            files: [{
                expand: true // consider all scss files in the directory
              , cwd: 'scss'
              , src: ['*.scss']
              , dest: 'css'
              , ext: '.min.css'
            }],

            options: {
              style: 'compressed'
            }
          }
      }

/* Module: Uglify
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-uglify)
 *
 * Does [JS minification](https://en.wikipedia.org/wiki/Minification_(programming).
 * A source map is produced to aid in debugging.
 *
 * Setup a new command for each app-level js file (as produced by
 * `grunt concat`).
 *
 * ### Commands ###
 *
 *   * `grunt uglify` - Run all uglify commads (below).
 *   * `grunt uglify:js` - Minifies the site's js file.
 */
    , uglify: {
          // globals
          options: {
            sourceMap: true
          }

        , yomama: {} // jk

        , js: {
              expand: true
            , cwd: 'build/js/'
            , src: './main.js'
            , dest: 'build/js/'
            , ext: '.min.js'
          }
      }


/* Watch
 * ------------------------------------------------------
 * [Docs](https://npmjs.org/package/grunt-contrib-watch)
 *
 * Run grunt commands when files change.
 *
 * ### Commands ####
 *
 *   * `grunt watch` - Run all watch commands (below) in a single watch session.
 *
 *     The files listed by each command will be monitored.  When one changes,
 *     the specified tasks for that command will be run.  Multiple tasks my be
 *     run by each command, and multiple commands may be triggered by a single
 *     file change.
 *
 *   * `grunt watch:common` - Monitor common files and build them on change.
 *   * `grunt watch:lib` - Monitor library files and build them on change.
 *   * `grunt watch:pages` - Monitor webpages and build them on change.
 */
    , watch: {
          options: {
              interrupt: true     // interupts the current tasks if another file is changed, restarting them
            , atBegin: true       // runs all tasks when the watch server is started
          }

        /*, download: {
              files: ['src/download/**']
            , tasks: ['build_download']
          }

        , img: {
              files: ['src/img/**']
            , tasks: ['build_img']
          }

        , js: {
              files: ['src/js/**']
            , tasks: ['build_js']
          }

        , lib: {
              files: ['src/lib/**']
            , tasks: ['build_lib']
          }

        , pages: {
              files: ['src/*.*'] // TODO: hack for only files
            , tasks: ['build_pages']
          }*/

        , styles: {
              files: ['scss/**']
            , tasks: ['build_styles']
          }

      }

  }); // end grunt config


/* Grunt Tasks
 * ==========================================================================
 * STYLE: Grunt tasks are grouped into sections, each of which is listed
 *        alphabetically.  The tasks themseleves are listed alphabetically
 *        within each section.  However each task may lists commands in a
 *        non-alphabetical order for performance or sequencing reasons.  For
 *        example, if the js files change much more than the webpages, it may
 *        make more sense to run js-related commands before page-related
 *        commands within a task.
 */

/* Task: Build and Friends
 * ------------------------------------------------------
 * Build the source code, or specific parts of it.
 *
 * Build should be used manually or to perform and application wide build.  It
 * will remove everything in `build/` and recreate the directory structure, then
 * add the built source code.
 *
 * More specific commands are used by `grunt watch` to only build parts affected
 * by the changed file.  They expect that `build/`'s directory structure is
 * already there.
 *
 * Run with `grunt build`.
 */
  grunt.registerTask('build', [
    /* 'clean:build'
    , 'trimtrailingspaces'
    , 'build_download'
    , 'build_img'
    , 'build_js'
    , 'build_lib'
    , 'build_pages'
    ,*/ 'build_styles'
  ]);

  grunt.registerTask('build_download', [
      'copy:download'
  ]);

  grunt.registerTask('build_img', [
      'copy:img'
  ]);

  grunt.registerTask('build_js', [
      'concat:js'
      , 'replace:firebaseURLInJS'
      , 'uglify:js'
      , 'copy:js'
  ]);

  grunt.registerTask('build_lib', [
      'copy:lib'
  ]);

  grunt.registerTask('build_pages', [
      'copy:pages',
      'replace:firebaseURLInHtml'
  ]);

  grunt.registerTask('build_styles', [
      'sass:stylin'
    , 'sass:stylin_min'
  ]);


/* Task: Default
 * ------------------------------------------------------
 * Define the default behavior that grunt should take when its not passed
 * any specific task or command to run.
 *
 * Run with `grunt`.
 */
  grunt.registerTask('default', [
      'build'
    //, 'test'
  ]);

/* Task: Test
 * ------------------------------------------------------
 * Run js and php unit tests.
 *
 * Run with `grunt test`.
 */
  grunt.registerTask('test', [
      'jshint:all'
    , 'test_js'
  ]);

}; // end module.exports functiono
