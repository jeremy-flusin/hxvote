'use strict';

angular.module('hxvoteBackEndNgApp')
  .factory('socketService', function () {
      var socket = io('localhost:8890');
      
      window.onbeforeunload = function(e) {
          socket.disconnect();
      };
      
      return socket;
});
