'use strict';
angular.module('Test2.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.test = '';
})

.controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
    $scope.test = '';
});
