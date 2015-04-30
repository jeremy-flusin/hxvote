'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('accessController', ['$scope', 'socketService', function ($scope, socketService) {
    
   $scope.accessLoaded = false;  
      
   socketService.emit('getAdminParams');
   socketService.on('getAdminParams_result', function (data) {
      $scope.frontAccessible = data.frontAccessible;
      $scope.accessLoaded = true; 
      $scope.$apply();
   });
      
}]);