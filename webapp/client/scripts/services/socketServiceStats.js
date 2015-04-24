'use strict';

angular.module('hxvoteStatsNgApp')
  .factory('socketService', function () {
      var socket = io('localhost:8890');
      return socket;
});