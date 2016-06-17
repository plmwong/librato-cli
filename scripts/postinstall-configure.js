#!/usr/bin/env node
var config = require('../modules/librato-cli-config');
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Librato API Token (e.g. foo@bar.com): ', (answer) => {
  config.setToken(answer);

  rl.question('Librato API Key: ', (answer) => {
    config.setApiKey(answer);

    console.log('librato-cli configured.')
    rl.close();
  });
});
