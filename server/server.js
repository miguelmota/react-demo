var request = require('request');
var moment = require('moment');
var express = require('express');
var _ = require('lodash');
var Q = require('q');
var cors = require('cors');

var app = express();
app.use(cors());

var config = require('./config.json');

app.get('/api/v1/events', function (req, res) {
  getMeetups(req.query).then(function(results) {
    res.json(results);
  }, function(error) {
    res.json({error: error});
  });
});

var server = app.listen(4539, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

function getMeetups(params) {
  params = params || {};
  var deferred = Q.defer();

  var url = 'https://api.meetup.com/2/open_events.json';

  request({
    url: url,
    qs: {
      text: params.query || '',
      //lat: null,
      //lon: null,
      city: params.city || '',
      state: params.state || '',
      zip: params.zip || '',
      radius: params.radius || 15,
      time: ((params.startDate && moment(params.startDate)) || moment()) + ',' + (params.endDate && moment(params.endDate)) || moment().add(10, 'days'),
      key: config.meetup.apiKey
    }
  }, function(error, response, body) {
    if (error) {
      console.error(error);
      return deferred.reject(error);
    }
    var parsed = JSON.parse(body);
    deferred.resolve(parsed.results);
    _.each(parsed.results, function(o) {
      console.log(o.group.who, moment(o.time).calendar());
      console.log(o.event_url);
    });
  });

  return deferred.promise;
}
