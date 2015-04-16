var client = (function() {
  return require('lbclient');
})();

angular
  .module('app')
  .value('Todo', client.models.LocalTodo);
