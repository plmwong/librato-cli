var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when exporting a space, but the space definition has not been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { return mockProgram; },
        usage: function() { return mockProgram; },
        option: function() { return mockProgram; },
        outputHelp: function() { return mockProgram; },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-export', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a space definition', function() {
    expect(output).toEqual('You must specify the id of the space you want to export');
  });
});

describe('when exporting a space', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var testSpaceResponse = { id: 1234 };
    var testChartResponse = [ { id: 999, streams: [ { id: 555 }, { id: 444 } ] } ];

    var mockClient = {
        get: function(endPoint, handler) {
          calledEndPoint = endPoint;

          if (calledEndPoint === 'v1/spaces/1234') {
            handler(testSpaceResponse, { });
          }

          if (calledEndPoint === 'v1/spaces/1234/charts') {
            handler(testChartResponse, { });
          }
        }
      };
    var mockProgram = {
        parse: function() { return mockProgram; },
        usage: function() { return mockProgram; },
        option: function() { return mockProgram; },
        outputHelp: function() { return mockProgram; },
        args: [ '1234' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-export',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call the specified chart resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/spaces/1234/charts');
  });

  it('should print out the response with all space and chart ids removed', function() {
    expect(output).toEqual('[\n  {\n    "streams": [\n      {},\n      {}\n    ]\n  }\n]');
  });
});
