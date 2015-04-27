'use strict';

angular.module('hxvoteBackEndNgApp')
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
      }

		$scope.supp = function supp($event, action){
			var index = $scope.actionsDec.indexOf(action);
			$scope.actionsDec.splice(index, 1);
			var index = $scope.actionsCroi.indexOf(action);
			$scope.actionsCroi.splice(index, 1);
		}
      
	 $scope.slide = function slide($event, action){
		 var stateSave = action.cover;
		  $scope.actions.forEach(function(action){
		  	  action.cover = false;
		  });
        action.cover = !stateSave;
    }
      
}]);