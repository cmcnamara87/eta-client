'use strict';

describe('Service: push', function () {

  // load the service's module
  beforeEach(module('etaApp'));

  // instantiate service
  var push;
  beforeEach(inject(function (_push_) {
    push = _push_;
  }));

  it('should do something', function () {
    expect(!!push).toBe(true);
  });

});
