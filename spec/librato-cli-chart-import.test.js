var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when importing a chart, but the space id has not been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-chart-import', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a space id', function() {
    expect(output).toEqual('You must specify a space id to import to chart in to');
  });
});

describe('when importing a chart', function() {
  var output, calledEndPoint, calledPayload;
  var testPayload;

  beforeEach(function() {
    testPayload = { foo: "bar" };
    var mockClient = {
        post: function(endPoint, data, handler) {
          calledEndPoint = endPoint;
          calledPayload = data;
          handler({ }, data, { });
        }
      };
    var mockProgram = {
        parse: function() { },
        args: [ '1234', JSON.stringify(testPayload) ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-chart-import',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call the specified chart resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/spaces/1234/charts');
  });

  it('should use the chart definition specified as payload to librato api', function() {
    expect(calledPayload.data).toEqual(testPayload);
  });

  it('should set the content type to JSON for librato api', function() {
    expect(calledPayload.headers['Content-Type']).toEqual('application/json');
  });
});
