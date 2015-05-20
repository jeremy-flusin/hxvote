'use strict';

angular.module('hxvoteFrontEndNgApp')
  .factory('socketService', function () {
      var socket = io('151.80.159.59:8890');
      
      window.onbeforeunload = function(e) {
          socket.disconnect();
      };
      
      return socket;
  });
