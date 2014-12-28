'use strict';

describe('SearchForm', function () {
  var SearchForm, component;

  beforeEach(function () {
    SearchForm = require('../../../src/scripts/components/SearchForm.jsx');
    component = SearchForm();
  });

  it('should create a new instance of SearchForm', function () {
    expect(component).toBeDefined();
  });
});
