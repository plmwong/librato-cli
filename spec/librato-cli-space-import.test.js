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

    proxyquire('../librato-cli-space-import', { 'commander': mockProgram, './modules/librato-cli-flow': { error: function(msg) { output = msg; } } });
  });

  it('should stop and tell the user to provide a space definition', function() {
    expect(output).toEqual('You must specify a space definition to import a space');
  });
});

describe('when importing a space', function() {
  var output;
  var calledEndPoints = [ ];
  var calledPayloads = [ ];
  var testPayload;

  beforeEach(function() {
    testSpaceDefinition = { name: 'foo', charts: [ { name: 'bar' } ] };
    var mockClient = {
        post: function(endPoint, data, handler) {
          calledEndPoints.push(endPoint);
          calledPayloads.push(data);
          handler({ }, data, { });
        }
      };
    var mockProgram = {
        parse: function() { },
        args: [ JSON.stringify(testSpaceDefinition) ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-import',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should create a new space', function() {
    expect(calledEndPoints[0]).toEqual('spaces');
    expect(calledPayloads[0].data).toEqual('{"name":"foo"}');
  });

  it('should create a chart within the new space for each chart defined', function() {
    expect(calledEndPoints[1]).toEqual('spaces/undefined/charts');
    expect(calledPayloads[1].data).toEqual(testSpaceDefinition.charts[0]);
  });

  it('should set the content type to JSON for librato api', function() {
    expect(calledPayloads[0].headers['Content-Type']).toEqual('application/json');
    expect(calledPayloads[1].headers['Content-Type']).toEqual('application/json');
  });
});
