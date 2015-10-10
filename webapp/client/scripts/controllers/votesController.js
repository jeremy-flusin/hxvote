'use strict';

angular.module('hxvoteBackEndNgApp')
  .controller('votesController', ['$window', '$scope', 'socketService', function ($window, $scope, socketService) {
     
      socketService.on('getActionsOrderedByVotes_result', function (data, order) {

        $scope.actions = data;
        $scope.soundPlaying = false;
          
        if(order == "ASC"){
          $scope.actionsCroi = data;
        }else{
          $scope.actionsDec = data;
        }

        $scope.$apply();

      });
      socketService.emit('getActionsOrderedByVotes', "ASC");
      socketService.emit('getActionsOrderedByVotes', "DESC");
      
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
     
     $scope.resetActionVotes = function resetActionVotes(){
         socketService.emit('resetVotes');
         socketService.on('resetVotes_results', function (bool) {
            console.log("Reseting votes:", bool);
         });
         socketService.emit('getActionsOrderedByVotes', "ASC");
         socketService.emit('getActionsOrderedByVotes', "DESC");
     }    
     
     $scope.playSound = function playSound($event, action){           
         socketService.emit('play-sound', action.shortLabel);
         $scope.soundPlaying = true;
     } 
     
     $scope.stopSound = function stopSound($event, action){  
         socketService.emit('stop-play');
         $scope.soundPlaying = false;
     }
    
    //Hack pour empêcher de rafraichir la page malencontreusement 
    var windowElement = angular.element($window);
    windowElement.on('beforeunload', function (event) {
      event.preventDefault();
    });

}]);
