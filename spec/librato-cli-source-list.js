var mock = require('mock-require');

describe("when obtaining a list of sources", function(){
  var output;

  beforeEach(function(done) {
    var testResponse = { foo: "bar" };

    mock('../modules/librato-cli-config', { });
    mock('node-rest-client',
      {
        Client: function() {
          return {
            get: function(endPoint, handler) {
              handler(testResponse, { });
              done();
            }
          };
        }
      });
    console.log = function(msg) { output = msg; };

    require("../librato-cli-source-list");
  });

  it("should print out the response from the sources resource", function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
