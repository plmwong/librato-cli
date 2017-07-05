var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when exporting a chart, but the space id has not been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-chart-export', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a space id', function() {
    expect(output).toEqual('You must specify the chart id and the space id of the space it is contained in to export it');
  });
});

describe('when exporting a chart, but the chart id has not been specified', function() {
  var output;

  beforeEach(function() {
    var mockProgram = {
        parse: function() { },
        args: [ ]
      };

    console.log = function(msg) { output = msg; };
    console.error = function(msg) { output = msg; };

    proxyquire('../librato-cli-chart-export', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a chart id', function() {
    expect(output).toEqual('You must specify the chart id and the space id of the space it is contained in to export it');
  });
});

describe('when exporting a chart', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { id: 999, streams: [ { id: 555 }, { id: 444 } ] };
    var mockClient = {
        get: function(endPoint, handler) {
          calledEndPoint = endPoint;
          handler(testResponse, { });
        }
      };
    var mockProgram = {
        parse: function() { },
        args: [ '1234', '5678' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-chart-export',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call the specified chart resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/spaces/1234/charts/5678');
  });

  it('should print out the response with the ids removed', function() {
    expect(output).toEqual('{\n  "streams": [\n    {},\n    {}\n  ]\n}');
  });
});

describe('when exporting a chart containing composite metrics', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { id: 999, streams: [ { metric: 'composite.metric', id: 555, composite: 's("composite", "%")', source: '%', group_function: 'sum' }, { id: 444 } ] };
    var mockClient = {
        get: function(endPoint, handler) {
          calledEndPoint = endPoint;
          handler(testResponse, { });
        }
      };
    var mockProgram = {
        parse: function() { },
        args: [ '1234', '5678' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-chart-export',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call the specified chart resource on librato api', function() {
    expect(calledEndPoint).toEqual('v1/spaces/1234/charts/5678');
  });

  it('should print out the response with the metric property removed', function() {
    expect(output).toEqual('{\n  "streams": [\n    {\n      "composite": "s(\\"composite\\", \\"%\\")"\n    },\n    {}\n  ]\n}');
  });

  it('should print out the response with the source property removed', function() {
    expect(output).toEqual('{\n  "streams": [\n    {\n      "composite": "s(\\"composite\\", \\"%\\")"\n    },\n    {}\n  ]\n}');
  });

  it('should print out the response with the group_function property removed', function() {
    expect(output).toEqual('{\n  "streams": [\n    {\n      "composite": "s(\\"composite\\", \\"%\\")"\n    },\n    {}\n  ]\n}');
  });
});
