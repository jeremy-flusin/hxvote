'use strict';

angular.module('hxvoteAdminNgApp')
  .controller('backController', ['$scope', 'socketService', function ($scope, socketService) {
   
   $scope.checked = false;  
     
   $scope.adminParams = {};  
   socketService.emit('getAdminParams');
   socketService.on('getAdminParams_result', function (data) {
      $scope.adminParams = data;
      $scope.checked = data.frontAccessible;
      $scope.$apply();
   });

   $scope.updateAccess = function updateAccess(value){
      console.log("Update access: ", value);
      var mockAdminParams = {
         frontAccessible: value
      };
      socketService.emit('setAdminParams', mockAdminParams);
      socketService.emit('getAdminParams');
   }
   
}]);