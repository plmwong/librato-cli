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
  var output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { foo: "bar" };
    var mockClient = {
          get: function(endPoint, handler) {
            calledEndPoint = endPoint;
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

  it('should call to the metric in the /metrics resource on librato api', function() {
    expect(calledEndPoint).toEqual('metrics/metric-name?start_time=1&end_time=1&resolution=60');
  });

  it('should print out the response from the /spaces resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
