'use strict';

angular.module('etaApp')
    .controller('ContactsFindByNameCtrl', function($scope, Restangular) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.findByName = function(name) {
            // Get list of names from server
            Restangular.one('me').all('users').getList({
                name: name
            }).then(function(users) {
                $scope.users = users;
            });
        };

        $scope.addFriend = function(user) {
            user.all('request').post({});
        };
    });
