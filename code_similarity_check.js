const spawn = require('child_process').spawn;

var exports = {};

exports.checkSimilarity = function(file1, file2, file3) {
  console.log('Starting similarity check...');
  const process = spawn('python',['./CodeSimilarityChecker/check.py', file1, file2, file3]);
  process.stdout.on('data', function(data) {
    console.log(data);
  });
};

module.exports = exports;
