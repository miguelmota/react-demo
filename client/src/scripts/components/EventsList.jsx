/**
* @jsx React.DOM
*/

'use strict';

var React = require('react/addons');
var moment = require('moment');

require('../../styles/EventsList.css');



var EventsList = React.createClass({
    render: function () {
        var results = this.props.data;
        var loader;
        if (this.props.loading) {
            loader = <p>Loading...</p>;
        }
        function venueDetails(result) {
            if (!result.venue) return;
            return  <div>
                        <details>
                            <summary>Where: {result.venue.name}</summary>
                            <div>
                                <div>Address: {result.venue.address_1}</div>
                                <div>City: {result.venue.city}</div>
                                <div>State: {result.venue.state}</div>
                                <div>Zip: {result.venue.zip}</div>
                                <div>Phone: {result.venue.phone}</div>
                                <div>ID: {result.venue.id}</div>
                            </div>
                        </details>
                    </div>
        }
        return (
            <div>
                {loader}
                <ul className="list">
                {results.map(function(result) {
                    return <li key={result.id} className="list-item">
                        <h2>{result.name}</h2>
                        <div>Description:</div>
                        <div dangerouslySetInnerHTML={{__html: result.description}}></div>
                        <div><p>Group: {result.group.name}</p></div>
                        <div><p>When: <strong>{moment(result.time).calendar()}</strong></p></div>
                        {venueDetails(result)}
                        <div><p>Distance: {(result.distance||0).toFixed(2)}mi</p></div>
                        <div><p>Going: {result.yes_rsvp_count}</p></div>
                        <div><p>Permalink: <a href={result.event_url} target="_blank">{result.event_url}</a></p></div>
                        <div><p>ID: {result.id}</p></div>
                        </li>;
                })}
                </ul>
            </div>
        );
    }
});

module.exports = EventsList;


