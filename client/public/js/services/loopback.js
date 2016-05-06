// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-isomorphic
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var client = (function() {
  return require('lbclient');
})();

angular
  .module('app')
  .value('Todo', client.models.LocalTodo);
