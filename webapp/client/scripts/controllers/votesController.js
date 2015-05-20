'use strict';

angular.module('hxvoteBackEndNgApp')
  .controller('votesController', ['$scope', 'socketService', function ($scope, socketService) {
    
      $scope.soundsToLoad = 0;
      $scope.soundsLoaded = 0;
      var audios = {};
      
      socketService.on('getActionsOrderedByVotes_result', function (data, order) {
            $scope.actions = data;
          
	    if(order == "DESC"){
	       $scope.actionsCroi = data;
	    }else{
	       $scope.actionsDec = data;
	    }

	  data.forEach(function(action){
		if(action.shortLabel !== null){
			console.log(action.shortLabel);

			$scope.soundsToLoad++;

			action.hasSound = true;			
		}  
	  });
  	  loadSounds(data);
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
    
     var loadSounds = function loadSounds(actions){
        actions.forEach(function(action){
	    if(action.shortLabel !== null){
		    var audio = loadSound(action);
		    action.soundPlaying = false;
		    $scope.$apply();
		    audios[action.shortLabel] = audio;	    
	    }
        });
     }
   
     var loadSound = function loadSound(action){

        var audio = document.createElement("audio");
        audio.src = "../audio/" + action.shortLabel + ".mp3";
        audio.type="audio/mpeg";
        audio.volume = 1;
         audio.addEventListener("loadeddata", function () {
            $scope.soundsLoaded ++;
            $scope.$apply(); 
         }, false);
        
        audio.addEventListener("ended", function () {
            action.soundPlaying = false;
            $scope.$apply(); 
         }, false);
         return audio;
         
     }
     
     $scope.playSound = function playSound($event, action){
         audios[action.shortLabel].play();            
         action.soundPlaying = true;
     } 
     
     $scope.stopSound = function stopSound($event, action){
         audios[action.shortLabel].pause();
         audios[action.shortLabel].currentTime = 0;           
         action.soundPlaying = false;
     }
     
}]);
