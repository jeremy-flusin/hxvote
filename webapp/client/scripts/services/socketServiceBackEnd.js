'use strict';

angular.module('hxvoteBackEndNgApp')
  .factory('socketService', function () {
      var socket = io('hypnose-xperience.com:8890');
      
      window.onbeforeunload = function(e) {
          socket.disconnect();
      };
      
      return socket;
});
