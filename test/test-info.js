// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: strong-tools
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var assert = require('tapsert');
var fmt = require('util').format;
var tools = require('../');

assert(tools.info, 'info is exported');
assert(tools.info.cli, 'info.cli is exported');
assert(tools.info.name, 'info.name is exported');
assert(tools.info.version, 'info.version is exported');
assert(tools.info.repo, 'info.repo is exported');
assert(tools.info.get, 'info.get is exported');

assertOutput('name', ['.'], 'strong-tools');
assertOutput('repo', ['.'], 'strongloop/strong-tools');
assertOutput('version', ['.'], /\d+\.\d+\.\d+/);
assertOutput('get', ['.', 'name'], 'strong-tools');
assertOutput('get', ['.', 'bugs.url'],
             'https://github.com/strongloop/strong-tools/issues');

function assertOutput(fn, args, output) {
  tools.info.cli.out = fmtAssert;
  return tools.info[fn].apply(null, args);

  function fmtAssert() {
    var printed = fmt.apply(null, arguments);
    if (output instanceof RegExp) {
      assert(output.test(printed),
             fmt('%s(%s) output matches %s', fn, args, output));
    } else {
      assert.equal(printed, output,
                   fmt('%s(%s) prints "%s"', fn, args, output));
    }
  }
}
