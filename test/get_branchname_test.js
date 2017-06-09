'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var currentBranch;

exports.get_branchname = {
  setUp: function(done) {
    grunt.util.spawn({
      cmd: 'git',
      args: ['symbolic-ref', 'HEAD', '--short']
    }, function (error, result) {
      currentBranch = result.stdout;
      done();
    });
  },
  default_options: function(test) {
    test.expect(1);

    test.equal(grunt.config.get('get_branchname.testconfig.branchname'), currentBranch, 'it injects the correct branch name into the specified config');

    test.done();
  }
};
