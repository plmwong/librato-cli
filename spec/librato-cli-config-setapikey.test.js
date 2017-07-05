var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when setting the configured api key, but none has been provided', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { return mockProgram; },
        usage: function() { return mockProgram; },
        outputHelp: function() { return mockProgram; },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-config-setapikey', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide an api key', function() {
    expect(output).toEqual('No API key specified, no configuration changes were applied');
  });
});
