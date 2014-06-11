'use strict';

describe('Controller: ContactsFindCtrl', function () {

  // load the controller's module
  beforeEach(module('etaApp'));

  var ContactsFindCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsFindCtrl = $controller('ContactsFindCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
