'use strict';

angular.module('etaApp')
    .controller('SignInCtrl', function($scope, Restangular, authService, Geo, $ionicLoading, $rootScope, $ionicPopup, ENV) {

        if (ENV.name === 'phone') {
            analytics.trackView('Sign in');
        }

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
            if (ENV.name === 'phone') {
                analytics.trackView('Sign in');
            }
        };
        $scope.goToRegister = function() {
            $scope.page = 'register';
            $scope.isShowingBack = true;
            if (ENV.name === 'phone') {
                analytics.trackView('Register');
            }
        };
        $scope.goBack = function() {
            $scope.page = 'landing';
            $scope.isShowingBack = false;
        };
        $scope.user = {};

        $scope.register = function(user) {
            if (ENV.name === 'phone') {
                analytics.trackEvent('User', 'Registration', user.name);
            }

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
            if (ENV.name === 'phone') {
                analytics.trackEvent('User', 'Manually sign in', user.name);
            }

            $ionicLoading.show({
                template: 'Loading...',
                noBackdrop: false
            });
            $scope.modal.hide();

            Restangular.all('users').login(user).then(function() {
                authService.loginConfirmed();
                $ionicLoading.hide();
                $rootScope.isLoggedIn = true;
            }, function() {
                $ionicPopup.alert({
                    title: 'Couldn\'t log in',
                    template: 'Check your email and password are correct and try again.'
                });
                $scope.modal.show();
            });
            // console.log('Sign-In', user);
        };
    });
