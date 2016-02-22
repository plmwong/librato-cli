var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when obtaining measurements for metric, but no metric name has been provided', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-get', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a metric name', function() {
    expect(output).toEqual('You must specify a metric name');
  });
});

describe('when obtaining measurements for metric, but no duration has been provided', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ 'metric-name' ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-get', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a duration', function() {
    expect(output).toEqual('You should supply the number of seconds in the past to query for');
  });
});

describe('when obtaining measurements for metric', function() {
  var output;
  var calledEndPoints = [];
  var getCallsMade = true;

  beforeEach(function() {
    var testResponse = { foo: "bar", query: { next_time: 12345 } };
    var mockClient = {
          get: function(endPoint, handler) {
            if (calledEndPoints.length > 0) {
              delete testResponse.query;
            }
            calledEndPoints.push(endPoint);
            handler(testResponse, { });
          }
        };
    var mockMoment = function() {
      return {
        unix: function() {
          return 1;
        },
        subtract: function() {
          return this;
        }
      };
    };
    var mockProgram = {
        parse: function() { },
        args: [ 'metric-name', 60 ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-get',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram, 'moment': mockMoment, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should make a first call to the metric using the specified start and end times', function() {
    expect(calledEndPoints[0]).toEqual('metrics/metric-name?start_time=1&end_time=1&resolution=60');
  });

  it('should make an additional call to the metric for any query start time returned from the api', function() {
    expect(calledEndPoints[0]).toEqual('metrics/metric-name?start_time=1&end_time=1&resolution=60');
  });

  it('should print out the response from the /spaces resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
