(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise('/')
    $stateProvider

      .state({
        name: 'login',
        url: '/',
        component: 'login'
      })

      .state({
        name: 'home',
        url: '/bookmark',
        component: 'searchBook'
      })

      .state({
        name: 'toRead',
        url: '/toread',
        component: 'toRead'
      })

      .state({
        name: 'read',
        url: '/read',
        component: 'read'
      })

  }

}());
