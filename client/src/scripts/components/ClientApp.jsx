/**
* @jsx React.DOM
*/

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var SearchForm = require('./SearchForm');
var EventsList = require('./EventsList');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var ClientApp = React.createClass({
    getInitialState: function() {
        return {
            searchResults: []
        };
    },
    onUpdate: function(data) {
        this.setState({
            searchResults: data
        });
    },
    isLoading: function(state) {
        this.setState({
            searchResultsLoading: state
        });
    },
    render: function() {
        return (
            <div className='main'>
            <ReactTransitionGroup transitionName="fade">
            <h1>Meetups Nearby</h1>
            <SearchForm onUpdate={this.onUpdate} isLoading={this.isLoading} />
            <EventsList data={this.state.searchResults} loading={this.state.searchResultsLoading} />
            </ReactTransitionGroup>
            </div>
        );
    }
});

module.exports = ClientApp;
