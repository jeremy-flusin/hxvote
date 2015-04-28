'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('actionController', ['$scope', 'socketService', '$routeParams', function ($scope, socketService, $routeParams) {
            
      $scope.familyLabel = $routeParams.familyLabel;
      $scope.posted = false;
      
      socketService.emit('getActionsOfCategory', $routeParams.familyLabel);
      socketService.on('getActionsOfCategory_result', function (data) {
            $scope.actions = data;
            $scope.$apply(); 
      });
      
      $scope.vote = function vote (actionId){
          socketService.emit('vote', actionId);
      }
      socketService.on('vote_result', function (data) {
            $scope.posted = true;
            $scope.$apply();    
      });
}]);