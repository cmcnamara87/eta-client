'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('etaApp', ['ionic', 'restangular', 'Test2.controllers', 'Test2.services']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        StatusBar.styleDefault();
    });
}).config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('/eta/api/index.php');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.contacts', {
            url: '/contacts',
            views: {
                'tab-contacts': {
                    resolve: {
                        contacts: function(Restangular) {
                            return Restangular.all('me/contacts').getList();
                        }
                    },
                    templateUrl: 'templates/tab-contacts.html',
                    controller: 'ContactsCtrl'
                }
            }
        })
        .state('tab.contact-detail', {
            url: '/contacts/:contactId',
            views: {
                'tab-contacts': {
                    resolve: {
                        contact: function(Restangular, $stateParams) {
                            return Restangular.one('me/contacts', $stateParams.contactId).get();
                        },
                        eta: function(Restangular, $stateParams) {
                            return Restangular.all('me/locations').post({
                                latitude: -27,
                                longitude: -153
                            }).then(function() {
                                return Restangular.one('me/contacts', $stateParams.contactId).one('eta').get();
                            });
                            // $stateParams.location = {latitude:-27,longitude:-153};
                            // return Restangular.one('me/contacts', $stateParams.contactId).get();
                        }
                    },
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
