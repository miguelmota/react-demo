/** @jsx React.DOM */

var ClientApp = require('./ClientApp');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={ClientApp}>
    </Route>
  </Routes>
), document.getElementById('content'));
