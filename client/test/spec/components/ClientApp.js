'use strict';

describe('Main', function () {
  var ClientApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ClientApp = require('../../../src/scripts/components/ClientApp.jsx');
    component = ClientApp();
  });

  it('should create a new instance of ClientApp', function () {
    expect(component).toBeDefined();
  });
});
