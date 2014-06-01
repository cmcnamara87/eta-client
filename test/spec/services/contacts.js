'use strict';

describe('Service: Contacts', function() {

    // load the service's module
    beforeEach(module('etaApp'));

    // instantiate service
    var Contacts;
    beforeEach(inject(function(_Contacts_) {
        Contacts = _Contacts_;
    }));

    it('should do something', function() {
        expect( !! Contacts).toBe(true);
    });

});
