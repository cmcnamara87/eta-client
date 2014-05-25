'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('etaApp', [
    'ionic',
    'restangular',
    'config',
    'http-auth-interceptor',
    'Test2.controllers',
    'Test2.services'
]).run(function($ionicPlatform, Geo, $rootScope, $ionicModal, ENV, Restangular, Push) {
    $rootScope.isLoggedIn = true;

    $ionicPlatform.ready(function() {
        console.log('plugins', window.plugins);
        console.log('ENV IS', ENV.name);

        Geo.startBackgroundLocation();
        Push.start();
        StatusBar.styleDefault();
    });

    $rootScope.$on('event:auth-loginRequired', function() {

        if ($rootScope.isLoggedIn) {
            // Show the sign in modal
            $ionicModal.fromTemplateUrl('templates/signin.html', {
                scope: $rootScope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.modal = modal;
                $rootScope.modal.show();
            });
        }
        $rootScope.isLoggedIn = false;

    });

}).config(function($stateProvider, $urlRouterProvider, RestangularProvider, ENV) {

    RestangularProvider.addElementTransformer('users', true, function(user) {
        // This will add a method called login that will do a POST to the path login
        // signature is (name, operation, path, params, headers, elementToPost)
        user.addRestangularMethod('login', 'post', 'login');
        user.addRestangularMethod('register', 'post', 'register');
        user.addRestangularMethod('logout', 'post', 'logout');
        return user;
    });

    RestangularProvider.setBaseUrl(ENV.baseUrl);
    // RestangularProvider.setBaseUrl('eta/api/index.php');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
        })
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.contacts', {
            url: '/contacts',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/tab-contacts.html',
                    controller: 'ContactsCtrl'
                }
            }
        })
        .state('tab.contact-detail', {
            url: '/contacts/:contactId',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/contact-detail.html',
                    controller: 'ContactDetailCtrl'
                }
            }
        })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    resolve: {
                        profile: function() {
                            // return Restangular.one('me/profile').get();
                        }
                    },
                    templateUrl: 'templates/tab-settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        })
        .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/tab-dash.html',
                    controller: 'DashCtrl'
                }
            }
        })
        .state('tab.friends', {
            url: '/friends',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/tab-friends.html',
                    controller: 'FriendsCtrl'
                }
            }
        })
        .state('tab.friend-detail', {
            url: '/friend/:friendId',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/friend-detail.html',
                    controller: 'FriendDetailCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/contacts');

});
