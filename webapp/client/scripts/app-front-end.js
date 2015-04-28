var appFrontEnd = angular.module('hxvoteFrontEndNgApp', ['ngRoute']);

appFrontEnd.config(function($routeProvider) {
    $routeProvider
        .when('/propose', {
            templateUrl : '../front/propose.html',
            controller  : 'proposeController'
        })
        .when('/family', {
            templateUrl : '../front/family.html',
            controller  : 'familyController'
        })
        .when('/action/:familyLabel', {
            templateUrl : '../front/action.html',
            controller  : 'actionController'
        })
        .when('/', {
            templateUrl : '../front/family.html',
            controller  : 'familyController'
        })
        .when('/about', {
            templateUrl : '../front/about.html',
            controller  : 'aboutController'
        })
        .when('/denied', {
            templateUrl : '../front/denied.html',
        })
});