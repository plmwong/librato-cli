var error = function(message) {
  console.error('\x1b[1m\x1b[31m  ' + message + '\x1b[0m\n');
  process.exit(1);
};

module.exports.error = error;
