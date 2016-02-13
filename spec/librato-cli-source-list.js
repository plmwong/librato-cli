describe('when obtaining a list of sources', function(){
  var mock = require('mock-require');
  var sourceListCommand, output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { foo: "bar" };

    mock('../modules/librato-cli-config', { baseUrl: '' });
    mock('node-rest-client',
      {
        Client: function() {
          return {
            get: function(endPoint, handler) {
              calledEndPoint = endPoint;
              handler(testResponse, { });
            }
          };
        }
      });
    console.log = function(msg) { output = msg; };

    sourceListCommand = require('../librato-cli-source-list');
  });

  afterEach(function() {
    mock.stopAll();
  });

  it('should call /sources resource on librato api', function() {
    expect(calledEndPoint).toEqual('sources');
  });

  it('should print out the response from the /sources resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
