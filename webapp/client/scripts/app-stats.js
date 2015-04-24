var appStats = angular.module('hxvoteStatsNgApp', ['ngRoute']);

appStats.config(function($routeProvider) {
    $routeProvider
        .when('/votes', {
            templateUrl : '../stats/votes.html',
            controller  : 'votesController'
        })
        .when('/proposals', {
            templateUrl : '../stats/proposals.html',
            controller  : 'proposalsController'
        })
        .when('/', {
            templateUrl : '../stats/votes.html',
            controller  : 'votesController'
        })
});