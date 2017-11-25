const fs = require('fs');
const nrc = require('node-run-cmd');
const natural = require('natural');

// Connect to S3
const Aws = require('aws-sdk');
const s3 = new Aws.S3();
const bucket = 'sourcecodestore';

var exports = {};

function finalScore(count) {
	var badness = 0;
	for(var type in count) badness += count[type];
	return badness;
}

function getScore(data, done) {
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
	return done(badness);
}

function readMyFile(path, scapath) {
	let content;
	try {
		content = fs.readFileSync(path, 'utf-8');
	} catch(ex) {
		console.log(ex);
	}
	getScore(content, function(badness) {
		console.log('getScore:' + badness);
		console.log(scapath);
		s3.putObject({
			Bucket : bucket,
			Key : scapath,
			Body : "Badness score : " + badness,
		}, function(err, data) {
			if(err) throw err;
			else console.log('Badness pushed');
		});
	});
}

exports.analyseFile = function(codeFile, errorFile, scapath) {
	s3.getObject({
		Bucket : bucket,
		Key : 'file1.cpp'
	}, function(err, data) {
		if(err) console.error(err);
		else {
			fs.writeFile("./temp/codeFile.cpp", data.Body.toString(), function(err) {
				if(err) throw err;
				nrc.run('cppcheck ./temp/codeFile.cpp' + ' 2> ' + errorFile).then(function(exitCodes) {
					readMyFile(errorFile, scapath);
				});
			});
		}
	});
};

module.exports = exports;
