var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when importing a space, but the space definition has not been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-import', { 'commander': mockProgram });
  });

  it('should stop and tell the user to provide a space definition', function() {
    expect(output).toEqual('You must specify a space definition to import a space');
  });
});
