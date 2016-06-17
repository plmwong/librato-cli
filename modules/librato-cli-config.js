var filesystem = require('fs');
var os = require("os");
var config = { baseUrl: 'https://metrics-api.librato.com/v1/' };

try {
  config = JSON.parse(filesystem.readFileSync(__dirname + '/../config.json'));
} catch (err) {
  if (err.code === 'ENOENT') {
    filesystem.writeFileSync(__dirname + '/../config.json', '{' + os.EOL + '    "baseUrl": "https://metrics-api.librato.com/v1/"' + os.EOL + '}' + os.EOL);
    console.error('Unable to find config file at ' + __dirname + '/../config.json. Re-initialised new configuration file, use config command to set credentials.');
  } else {
    console.error('Could not read config file at ' + __dirname + '/../config.json');
  }
}

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

module.exports = config;
module.exports.setToken = setToken;
module.exports.setApiKey = setApiKey;
