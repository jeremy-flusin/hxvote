'use strict';

angular.module('hxvoteAdminNgApp')
  .factory('socketService', function () {
      var socket = io('localhost:8890');
      
      window.onbeforeunload = function(e) {
          socket.disconnect();
      };
      
      return socket;
});