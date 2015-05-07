'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('actionController', ['$scope', '$location', 'socketService', '$routeParams', function ($scope, $location, socketService, $routeParams) {
            
      $scope.familyLabel = $routeParams.familyLabel;
      $scope.posted = false;
      $scope.hasVoted = false; 
      
      socketService.emit('getActionsOfCategory', $routeParams.familyLabel);
      socketService.on('getActionsOfCategory_result', function (data) {
            $scope.actions = data;
            $scope.$apply(); 
      });
      
      $scope.vote = function vote (action){
          if(!action.voted){
              socketService.emit('vote', action.id);
              action.voted = true;      
              $scope.hasVoted = true;  
              setTimeout(function(){
                $location.path("/");    
                $scope.$apply();
              }, 5000);
          }
      }
      socketService.on('vote_result', function (data) {
            $scope.posted = true;
            $scope.$apply();    
      });
}]);