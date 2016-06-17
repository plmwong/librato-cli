#!/usr/bin/env node
var config = require('../modules/librato-cli-config');
var os = require('os');
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(os.EOL + 'Setting up Librato credentials. These can be altered later using "librato-cli config".');

rl.question('Enter your Librato API Token (e.g. foo@bar.com): ', (answer) => {
  config.setToken(answer);

  rl.question('Enter your Librato API Key: ', (answer) => {
    config.setApiKey(answer);

    console.log('librato-cli configured.' + os.EOL);
    rl.close();
  });
});
