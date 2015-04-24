'use strict';

angular.module('hxvoteFrontEndNgApp')
  .controller('proposeController', ['$scope', 'socketService', function ($scope, socketService) {
      
    $scope.action = {};
    $scope.posted = false;

    $scope.submit = function submit(){
      socketService.emit('propose', $scope.action);
    }

    socketService.on('propose_result', function(res){
        if(res){
            $scope.action.description = '';
            $scope.posted = true;
            $scope.$apply();
        }
    });
      
}]);