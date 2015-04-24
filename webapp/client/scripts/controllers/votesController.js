'use strict';

angular.module('hxvoteStatsNgApp')
  .controller('votesController', ['$scope', 'socketService', function ($scope, socketService) {
      
      var invertArray = function invertArray(array){
        var inverted = [];
        array.forEach(function(item, index){
            inverted[array.length - index - 1] = array[index];
        });
        return inverted;
      }
      
      socketService.emit('getActionsOrderedByVotes');
      socketService.on('getActionsOrderedByVotes_result', function (data) {
            $scope.actions = data;
            $scope.actionsDec = data;
            $scope.actionsCroi = invertArray(data);
            $scope.$apply(); 
      });
      
      $scope.downOrder = function downOrder(){
            $scope.actions = $scope.actionsDec;
      } 
      
      $scope.upOrder = function upOrder(){
            $scope.actions = $scope.actionsCroi;
          console.log($scope.actionsCroi);
      }
      
      
      
}]);