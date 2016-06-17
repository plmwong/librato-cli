var filesystem = require('fs');
var os = require("os");
var config = { baseUrl: 'https://metrics-api.librato.com/v1/' };

var initConfig = function() {
  filesystem.writeFileSync(__dirname + '/../config.json', '{' + os.EOL + '    "baseUrl": "https://metrics-api.librato.com/v1/"' + os.EOL + '}' + os.EOL);
};

var saveConfig = function() {
  var configContents = JSON.stringify(config, null, 2);
  filesystem.writeFileSync(__dirname + '/../config.json', configContents);
};

var setToken = function(token) {
  config.libratoToken = token;
  saveConfig();
};

var setApiKey = function(apiKey) {
  config.libratoApiKey = apiKey;
  saveConfig();
};

try {
  config = JSON.parse(filesystem.readFileSync(__dirname + '/../config.json'));
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Configuration file initialised.');
    initConfig();
  } else {
    console.error('Could not read config file at ' + __dirname + '/../config.json');
  }
}

module.exports = config;
module.exports.initConfig = initConfig;
module.exports.setToken = setToken;
module.exports.setApiKey = setApiKey;
