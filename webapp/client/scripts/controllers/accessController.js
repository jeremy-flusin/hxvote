'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('accessController', ['$scope', 'socketService', function ($scope, socketService) {
   $scope.about = false; 
   $scope.accessLoaded = false;  
      
   socketService.emit('getAdminParams');
   socketService.on('getAdminParams_result', function (data) {
        console.log(data.frontAccessible);   
      $scope.frontAccessible = data.frontAccessible;
      $scope.accessLoaded = true; 
      $scope.$apply();
   });
      
}]);