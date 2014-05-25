'use strict';

angular.module('etaApp')
    .controller('SignInCtrl', function($scope, Restangular, authService, Geo, $ionicLoading, $rootScope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.page = 'landing';
        $scope.isShowingBack = false;

        $scope.goToSignin = function() {
            $scope.page = 'signin';
            $scope.isShowingBack = true;
        };
        $scope.goToRegister = function() {
            $scope.page = 'register';
            $scope.isShowingBack = true;
        };
        $scope.goBack = function() {
            $scope.page = 'landing';
            $scope.isShowingBack = false;
        };
        $scope.user = {};

        $scope.register = function(user) {
            $scope.modal.hide();

            $ionicLoading.show({
                template: 'Loading...',
                noBackdrop: false
            });

            Restangular.all('users').register(user).then(function() {
                return Geo.getLocation();
            }).then(function() {
                $ionicLoading.hide();
                authService.loginConfirmed();
                $rootScope.isLoggedIn = true;
            });
        };
        $scope.signIn = function(user) {
            $ionicLoading.show({
                template: 'Loading...',
                noBackdrop: false
            });
            $scope.modal.hide();

            Restangular.all('users').login(user).then(function() {
                authService.loginConfirmed();
                $ionicLoading.hide();
                $rootScope.isLoggedIn = true;
            });
            // console.log('Sign-In', user);
        };
    });
