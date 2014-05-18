'use strict';

angular.module('etaApp')
    .factory('Geo', function($q) {
        // Service logic
        // ...

        var meaningOfLife = 42;

        // Public API here
        return {
            getLocation: function() {
                var q = $q.defer();

                navigator.geolocation.getCurrentPosition(function(position) {
                    q.resolve(position);
                }, function(error) {
                    q.reject(error);
                });

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
                return q.promise;
            },
            someMethod: function() {
                return meaningOfLife;
            }
        };
    });
