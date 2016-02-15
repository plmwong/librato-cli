var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when obtaining a list of metrics without a filter', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { foo: "bar" };
    var mockClient = {
          get: function(endPoint, handler) {
            calledEndPoint = endPoint;
            handler(testResponse, { });
          }
        };
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-list',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call /metrics resource on librato api', function() {
    expect(calledEndPoint).toEqual('metrics?name=');
  });

  it('should print out the response from the /metrics resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
