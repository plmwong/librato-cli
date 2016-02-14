var filesystem = require('fs');
var config = { baseUrl: 'https://metrics-api.librato.com/v1/' };
try {
  config = JSON.parse(filesystem.readFileSync('config.json'));
} catch (err) {
}

var saveConfig = function() {
  var configContents = JSON.stringify(config, null, 2);
  filesystem.writeFileSync('config.json', configContents);
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
