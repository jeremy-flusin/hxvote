var appAdmin = angular.module('hxvoteAdminNgApp', ['ngRoute']);

appAdmin.config(function($routeProvider) {
    $routeProvider
        .when('/edit', {
            templateUrl : '../admin/edit_family.html',
            controller  : 'editFamilyController'
        })
        .when('/archives', {
            templateUrl : '../admin/archives.html',
            controller  : 'archivesController'
        })
        .when('/', {
            templateUrl : '../admin/edit.html',
            controller  : 'editFamilyController'
        })
});