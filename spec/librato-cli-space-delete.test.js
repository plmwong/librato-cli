var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when deleting a particular space, but the space id has not been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-delete', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a space id', function() {
    expect(output).toEqual('You must specify a space id');
  });
});

describe('when deleting a particular space', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var mockClient = {
          delete: function(endPoint, handler) {
            calledEndPoint = endPoint;
            handler({ }, { });
          }
        };
    var mockProgram = {
        parse: function() { },
        args: [ '1234' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-delete',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call /spaces resource on librato api for the specified space', function() {
    expect(calledEndPoint).toEqual('spaces/1234');
  });
});
