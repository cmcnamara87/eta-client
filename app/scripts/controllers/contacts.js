'use strict';

angular.module('eta')
    .controller('ContactsCtrl', function($scope, contacts) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.contacts = contacts;
    });
