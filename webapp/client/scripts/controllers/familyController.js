'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('familyController', ['$scope', 'socketService', function ($scope, socketService) {
            
      socketService.emit('getCategories');
      socketService.on('getCategories_result', function (data) {
            $scope.families = data;
            $scope.$apply(); 
      });
    
      
      
}]);