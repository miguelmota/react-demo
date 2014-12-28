'use strict';

describe('EventsList', function () {
  var EventsList, component;

  beforeEach(function () {
    EventsList = require('../../../src/scripts/components/EventsList.jsx');
    component = EventsList();
  });

  it('should create a new instance of EventsList', function () {
    expect(component).toBeDefined();
  });
});
