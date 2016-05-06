// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-isomorphic
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('TodoCtrl', ['$scope', 'Todo', function($scope, Todo) {
    $scope.todos = [];
    function getTodos() {
      Todo.find()
        .then(function(todos) {
          $scope.todos = todos;
          $scope.$apply();
        });
    }
    getTodos();

    $scope.addTodo = function() {
      Todo.create($scope.newTodo)
        .then(function(todo) {
          $scope.newTodo = '';
          $scope.todoForm.content.$setPristine();
          $('.focus').focus();
          getTodos();
        });
    };

    $scope.removeTodo = function(todo) {
      todo.destroy()
        .then(function() {
          getTodos();
        });
    };
  }]);
