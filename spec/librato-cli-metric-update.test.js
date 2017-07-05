var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when updating a metric, but no metric name has been given', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-update', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a metric name', function() {
    expect(output).toEqual('You must specify the metric name or pattern of the metric you wish to update');
  });
});

describe('when updating a metric, but no property changes have been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ 'metric-name' ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-update', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide some property changes', function() {
    expect(output).toEqual('No properties were specified, nothing was done');
  });
});

describe('when changing properties on a metric', function() {
  var output, calledEndPoint, calledPayload;

  beforeEach(function() {
    var testResponse = { foo: "bar" };
    var mockClient = {
          put: function(endPoint, data, handler) {
            calledEndPoint = endPoint;
            calledPayload = data;
            handler({ }, data, { });
          },
          get: function(endPoint, handler) {
            handler({ metrics: [ { name: "metric-name" } ] }, { });
          }
        };
    var mockProgram = {
        parse: function() { },
        args: [ 'metric-name', 'property1=value1', 'property2=value2' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-update',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should update the specified metric resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/metrics/metric-name');
  });

  it('should send the list of property changes as the request body to the librato api', function() {
    expect(calledPayload.data).toEqual('property1=value1&property2=value2');
  });

  it('should use a www-form-urlencoded content type', function() {
    expect(calledPayload.headers['Content-Type']).toEqual('application/x-www-form-urlencoded');
  });
});
