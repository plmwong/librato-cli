var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when changing attributes on a metric', function() {
  var output, calledEndPoint, calledPayload;

  beforeEach(function() {
    var testResponse = { foo: "bar" };
    var mockClient = {
          put: function(endPoint, data, handler) {
            calledEndPoint = endPoint;
            calledPayload = data;
            handler({ }, data, { });
          }
        };
    var mockProgram = {
        parse: function() { },
        args: [ 'metric-name', 'attribute=value' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-metric-attr',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call /metrics resource on librato api', function() {
    expect(calledEndPoint).toEqual('metrics/metric-name');
  });
});
