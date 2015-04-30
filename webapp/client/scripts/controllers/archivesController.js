'use strict';

angular.module('hxvoteAdminNgApp')
  .controller('archivesController', ['$scope', 'socketService', function ($scope, socketService) {
   
      $scope.proposalsView = true;
      
      socketService.emit('getArchivedProposals');
      socketService.on('getArchivedProposals_result', function (data) {
            $scope.proposals = data;
            $scope.$apply(); 
      });
          
    $scope.slide = function slide($event, proposal){
		 var stateSave = proposal.cover;
		  $scope.proposals.forEach(function(proposal){
		  	  proposal.cover = false;
		  });
        proposal.cover = !stateSave;
    }
    
    $scope.supp = function supp($event, proposal){
        var index = $scope.proposals.indexOf(proposal);
        $scope.proposals.splice(index, 1);
         socketService.emit('deleteArchivedProposal', proposal);
         socketService.on('deleteArchivedProposal_result', function (bool) {
            console.log("deleted from archived proposals: ", bool);
         });
    } 
    
    var invertArray = function invertArray(array){
        var inverted = [];
        array.forEach(function(item, index){
            inverted[array.length - index - 1] = array[index];
        });
        return inverted;
      }
      
      socketService.emit('getActionsOrderedByVotes');
      socketService.on('getActionsOrderedByVotes_result', function (data) {          
          console.log(data);
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
    
}]);