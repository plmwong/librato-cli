var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when obtaining a list of spaces', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { foo: "bar" };
    var mockClient = {
          get: function(endPoint, handler) {
            calledEndPoint = endPoint;
            handler(testResponse, { });
          }
        };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-list',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' } });
  });

  it('should call /spaces resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/spaces');
  });

  it('should print out the response from the /spaces resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
