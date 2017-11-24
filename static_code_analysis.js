const fs = require('fs');
const nrc = require('node-run-cmd');
const natural = require('natural');

var exports = {};

function finalScore(count) {
	var badness = 0;
	for(var type in count) badness += count[type];
	return badness;
}

function getScore(data) {
	var count = {
		"error" : 0,
		"warning" : 0,
		"style" : 0,
		"performance" : 0,
		"portability" : 0,
		"information" :0
	};
	var sentences = data.split("\n");
	var wordTokenizer = new natural.WordTokenizer();
	var types = ["[(]error[)]", "[(]warning[)]", "[(]style[)]", "[(]performance[)]", "[(]portability[)]", "[(]information[)]"];
	for (var i = 0; i < sentences.length - 1; i++) {
		for (var j = 0; j < types.length; j++) {
			if (sentences[i].match(types[j]) != null) {
				count[types[j].slice(3, -3)] += 1;
				break;
			}
		}
	}
	console.log(count);
	var badness = finalScore(count);
	console.log("Badness Score : " + badness);
}

function readMyFile(path) {
	let content;
	try {
		content = fs.readFileSync(path, 'utf-8');
	} catch(ex) {
		console.log(ex);
	}
	getScore(content);
}

exports.analyseFile = function(codeFile, errorFile) {
	nrc.run('cppcheck ' + codeFile + ' 2> ' + errorFile).then(function(exitCodes) {
		readMyFile(errorFile);
	});
};

module.exports = exports;
