'use strict';

angular.module('etaApp')
    .factory('Geo', function($q, Restangular, $rootScope) {
        // Service logic
        // ...


        var bgGeo;

        /**
         * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
         */
        // var yourAjaxCallback = function(response) {
        ////
        // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
        //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        //
        //
        // bgGeo.finish();
        // };

        /**
         * This callback will be executed every time a geolocation is recorded in the background.
         */
        var callbackFn = function(location) {
            // $ionicPopup.alert({
            //     title: 'Got sig location change',
            //     template: 'Okay'
            // });

            if ($rootScope.isLoggedIn) {
                Restangular.all('me/locations').post({
                    latitude: location.latitude,
                    longitude: location.longitude
                }).then(function() {
                    bgGeo.finish();
                });
            } else {
                bgGeo.finish();
            }
            // console.log('[js] BackgroundGeoLocation callback:  ' + location.latitudue + ',' + location.longitude);
            // Do your HTTP request here to POST location to your server.
            //
            //
            // yourAjaxCallback.call(this);
        };

        var failureFn = function(error) {
            console.log('BackgroundGeoLocation error', error);
        };

        // BackgroundGeoLocation is highly configurable.
        // bgGeo.

        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.


        // If you wish to turn OFF background-tracking, call the #stop method.
        // bgGeo.stop()

        // Public API here
        var geo = {
            startBackgroundLocation: function() {
                bgGeo = window.plugins.backgroundGeoLocation;
                // HTTP POST params sent to your server when persisting locations.
                bgGeo.configure(callbackFn, failureFn, {
                    url: 'http://only.for.android.com/update_location.json', // <-- only required for Android; ios allows javascript callbacks for your http
                    // params: {
                    //     'auth_token': 'user_secret_auth_token'
                    //     foo: 'bar'
                    // },

                    desiredAccuracy: 10,
                    stationaryRadius: 20,
                    distanceFilter: 30,
                    debug: false // <-- enable this hear sounds for background-geolocation life-cycle.
                });
                // $ionicPopup.alert({
                //     title: 'Starting Geo',
                //     template: 'Okay'
                // });
                geo.getLocation().then(function() {
                    // $ionicPopup.alert({
                    //     title: 'Got current location',
                    //     template: 'Okay'
                    // });
                    bgGeo.start();
                });
            },
            /**
             *        {
              "timestamp": 1400398564474,
              "coords": {
                "speed": null,
                "heading": null,
                "altitudeAccuracy": null,
                "accuracy": 42,
                "altitude": null,
                "longitude": 153.0022722,
                "latitude": -27.4961073
              }
            }
                  
             */
            getLocation: function() {
                var q = $q.defer();

                navigator.geolocation.getCurrentPosition(function(position) {
                    q.resolve(position);
                }, function(error) {
                    q.reject(error);
                });
                return q.promise;
            }
        };

        return geo;
    });
