'use strict';

angular.module('hxvoteBackEndNgApp')
  .factory('socketService', function () {
      var socket = io('localhost:8890');
      return socket;
});