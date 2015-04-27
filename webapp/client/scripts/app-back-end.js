var appStats = angular.module('hxvoteBackEndNgApp', ['ngRoute']);

appStats.config(function($routeProvider) {
    $routeProvider
        .when('/votes', {
            templateUrl : '../back/votes.html',
            controller  : 'votesController'
        })
        .when('/proposals', {
            templateUrl : '../back/proposals.html',
            controller  : 'proposalsController'
        })
        .when('/', {
            templateUrl : '../back/votes.html',
            controller  : 'votesController'
        })
});