// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-isomorphic
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
      });

    $urlRouterProvider.otherwise('todo');
  }]);
