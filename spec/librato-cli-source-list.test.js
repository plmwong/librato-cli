var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when obtaining a list of sources', function() {
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

    proxyquire('../librato-cli-source-list',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' } });
  });

  it('should call /sources resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/sources');
  });

  it('should print out the response from the /sources resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
