'use strict';

angular.module('hxvoteStatsNgApp')
  .controller('proposalsController', ['$scope', 'socketService', function ($scope, socketService) {
      
      socketService.emit('getProposals');
      socketService.on('getProposals_result', function (data) {
          console.log(data);
            $scope.proposals = data;
            $scope.$apply(); 
      });
      
}]);