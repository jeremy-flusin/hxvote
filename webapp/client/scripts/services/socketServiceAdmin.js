'use strict';

angular.module('hxvoteAdminNgApp')
  .factory('socketService', function () {
      var socket = io('localhost:8890');
      return socket;
});