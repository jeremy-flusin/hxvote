var appFrontEnd = angular.module('hxvoteFrontEndNgApp', ['ngRoute']);

appFrontEnd.config(function($routeProvider) {
    $routeProvider
        .when('/propose', {
            templateUrl : '../front/propose.html',
            controller  : 'proposeController'
        })
        .when('/about', {
            templateUrl : '../front/about.html',
            controller  : 'aboutController'
        })
        .when('/family', {
            templateUrl : '../front/family.html',
            controller  : 'familyController'
        })
        .when('/', {
            templateUrl : '../front/family.html',
            controller  : 'familyController'
        })
});