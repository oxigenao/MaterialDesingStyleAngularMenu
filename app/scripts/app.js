'use strict';

/**
 * @ngdoc overview
 * @name mdmenuApp
 * @description
 * # mdmenuApp
 *
 * Main module of the application.
 */
angular
  .module('mdmenuApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
