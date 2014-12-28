/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var $ = require('jquery');

require('../../styles/SearchForm.css');

var SearchForm = React.createClass({
    url: 'http://0.0.0.0:4539/api/v1/events',
    getInitialState: function() {
        return {
            data: []
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var query = this.refs.query.getDOMNode().value.trim();
        var city = this.refs.city.getDOMNode().value.trim();
        var state = this.refs.state.getDOMNode().value.trim();
        var zip = this.refs.zip.getDOMNode().value.trim();
        var radius = this.refs.radius.getDOMNode().value.trim();
        var startDate = this.refs.startDate.getDOMNode().value.trim();
        var endDate = this.refs.endDate.getDOMNode().value.trim();
        this.setState({loading: true});
        this.props.isLoading(true);
        $.ajax({
            url: this.url,
            data: {
                query: query,
                city: city,
                state: state,
                radius: radius,
                startDate: startDate,
                endDate: endDate
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('Success:', data);
                this.setState({data: data, loading: false});
                this.props.isLoading(false);
                this.props.onUpdate(data);
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({loading: false});
                console.error(this.url, status, err);
            }.bind(this)
        });
        return;
  },
  render: function () {
    return (
        <form className="search-form" onSubmit={this.handleSubmit}>
            <div><label>Search term:</label> <input type="text" placeholder="Search term" ref="query" /></div>
            <div><label>City:</label> <input type="text" placeholder="City" ref="city" defaultValue="" /></div>
            <div><label>State:</label> <input type="text" placeholder="State" ref="state" defaultValue="" /></div>
            <div><label>Zip:</label> <input type="text" placeholder="Zip" ref="zip" defaultValue="" /></div>
            <div><label>Start date:</label> <input type="text" placeholder="MM/DD/YYYY" ref="startDate" defaultValue="" /></div>
            <div><label>End date:</label> <input type="text" placeholder="MM/DD/YYYY" ref="endDate" defaultValue="" /></div>
            <div><label>Radius:</label> <input type="text" placeholder="Radius" ref="radius" defaultValue="15" /></div>
            <div><button type="submit">Search</button></div>
        </form>
      );
  }
});

module.exports = SearchForm;


