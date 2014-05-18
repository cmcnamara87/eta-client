'use strict';

angular.module('eta')
  .controller('ContactDetailCtrl', function ($scope, contact) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.contact = contact;
  });
