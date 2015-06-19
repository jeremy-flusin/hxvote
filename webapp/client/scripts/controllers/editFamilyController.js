'use strict';

angular.module('hxvoteAdminNgApp')
  .controller('editFamilyController', ['$scope', 'socketService', function ($scope, socketService) {
      
      $scope.addingFamily = false;
      
      socketService.emit('getCategories');
      socketService.on('getCategories_result', function (data) {
            $scope.families = data;
            $scope.$apply(); 
      }); 
    
      $scope.slideNewFamily = function slideNewFamily(){
         $scope.addingFamily = !$scope.addingFamily;  
      }
      
      //petit hack pour éviter que l'input ne disparaisse quand on clique/tape dessus
      $scope.inputFocus = function inputFocus($event){
        $event.stopPropagation();
      }
      
      $scope.saveNewFamily = function saveNewFamily($event){
        console.log($scope.newFamily);
        socketService.emit('saveNewCategory', $scope.newFamily);
        socketService.on('saveNewCategory_result', function (bool) {
          if(bool){
            socketService.emit('getCategories');        
            $scope.newFamily = "";
          }
        });

      }
}]);