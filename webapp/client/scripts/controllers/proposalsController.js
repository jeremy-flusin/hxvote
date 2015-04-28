'use strict';

angular.module('hxvoteBackEndNgApp')
  .controller('proposalsController', ['$scope', 'socketService', function ($scope, socketService) {
      
      socketService.emit('getProposals');
      socketService.on('getProposals_result', function (data) {
          console.log(data);
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
         socketService.emit('deleteProposal', proposal);
         socketService.on('deleteProposal_result', function (bool) {
            console.log("deleted from proposals: ", bool);
         });
    }
        
    $scope.save = function supp($event, proposal){
         socketService.emit('archiveActionRequest', proposal);
         socketService.on('archiveActionRequest_result', function (bool) {
            console.log("archived: ", bool);
         });         
         socketService.emit('deleteProposal', proposal);
         socketService.on('deleteProposal_result', function (bool) {
            console.log("deleted from proposals: ", bool);
         });
         
         var index = $scope.proposals.indexOf(proposal);
         $scope.proposals.splice(index, 1);
    }
    
}]);