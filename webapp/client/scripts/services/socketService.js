'use strict';

angular.module('hxvoteFrontEndNgApp')
  .factory('socketService', function () {
      var socket = io('localhost:8890');
      return socket;
  });