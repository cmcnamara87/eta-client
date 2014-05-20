'use strict';

angular.module('etaApp')
    .controller('SignInCtrl', function($scope, Restangular, authService, Geo, $ionicLoading) {
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
            $ionicLoading.show({
                template: 'Loading...',
                noBackdrop: false
            });
            $scope.modal.hide();

            Restangular.all('users').register(user).then(function() {
                return Geo.getLocation();
            }).then(function(position) {
                return Restangular.all('me/locations').post({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }).then(function() {
                $ionicLoading.hide();
                authService.loginConfirmed();
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
            });
            // console.log('Sign-In', user);
        };
    });
