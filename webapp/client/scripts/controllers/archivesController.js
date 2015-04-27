'use strict';

angular.module('hxvoteAdminNgApp')
  .controller('archivesController', ['$scope', 'socketService', function ($scope, socketService) {
      
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
    }
    
}]);