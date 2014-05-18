'use strict';

angular.module('etaApp')
    .controller('ContactDetailCtrl', function($scope, contact, eta) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.contact = contact;
        $scope.eta = eta;
    });
