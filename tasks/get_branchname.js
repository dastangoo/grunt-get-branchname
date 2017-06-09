 /*
 * grunt-get-branchname
 * https://github.com/dastangoo/grunt-get-branchname
 *
 * Copyright (c) 2017 Hamed Dastangoo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('get_branchname', 'Get current branch name and pass it to another task\'s config', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async(),
        options = this.options({
          target: null,
          short: true,
          quiet: false

        });
    if (!options.target) {
      grunt.log.error('target option is null, please specify a target');
      done(false);
    }

    var args = [
      'symbolic-ref', 'HEAD'
    ];

    if (options.short) {
      args.push('--short');
    }
    if (options.quiet) {
      args.push('-q');
    }
    grunt.util.spawn({
      cmd: 'git',
      args: args
    }, function (error, result) {
      if (error) {
        grunt.log.error([error]);
        done(false);
      }
      grunt.config.set(options.target, result.stdout);
      done();
    });
  });

};
