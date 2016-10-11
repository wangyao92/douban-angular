
'use strict';
// Declare app level module which depends on views, and components
angular.module('mainModule', [
    'configModule',
    'ui.router',
    'listModule.controller',
    'listModule.service',
    'detailModule.controller',
    'detailModule.service',
    'crossModule.service'
])
    .controller('mainController',['$scope','$window', function ($scope,$window) {
        $scope.$on('emitSearchFn', function (e, fn) {
            $scope.search = fn;
        });
        $scope.onKey = function (e) {
            var keyCode = $window.event ? e.keyCode : e.which;
            console.log(keyCode);
            if(keyCode == 13){
                $scope.search($scope.searchText);
            }
        };
        $scope.$on('emitSearchFn2', function (e, fn) {
            $scope.isActive = fn;
        });
    }])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('list',{
                url : '/list/:type',
                templateUrl : 'areas/list/list.html',
                controller : 'listController'
            })
            .state('detail',{
                url : '/detail/:id',
                templateUrl : 'areas/detail/detail.html',
                controller : 'detailController'
            })

      $urlRouterProvider.otherwise('/list/in_theaters');
    }]);
