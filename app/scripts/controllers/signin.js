'use strict';

angular.module('etaApp')
    .controller('SignInCtrl', function($scope, Restangular, authService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.user = {
            email: 'cmcnamara87@gmail.com',
            password: 'test'
        };

        $scope.signIn = function(user) {
            Restangular.all('users').login(user).then(function() {
                authService.loginConfirmed();
                $scope.modal.hide();
            });
            // console.log('Sign-In', user);
        };
    });
