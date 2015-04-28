'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('accessController', ['$scope', 'socketService', function ($scope, socketService) {
            
   socketService.emit('getAdminParams');
   socketService.on('getAdminParams_result', function (data) {
      $scope.frontAccessible = data.frontAccessible;
      $scope.$apply();
   });
      
}]);