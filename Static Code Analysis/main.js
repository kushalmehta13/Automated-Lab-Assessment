console.log("Static Analysis of Code");

function createFileSystem()
{
	return require('fs');
}

function finalScore(count)
{
	var badness = 0;
	for (var type in count)
	{
		badness += count[type];
	}
	return badness;
}

function getScore(data)
{
	var count = {
					"error" : 0,
					"warning" : 0,
					"style" : 0,
					"performance" : 0,
					"portability" : 0,
					"information" :0
				}
	
	var sentences = data.split("\n");
	//console.log(sentences);
	
	var natural = require('natural');
	var wordTokenizer = new natural.WordTokenizer();
	
	var types = ["[(]error[)]", "[(]warning[)]", "[(]style[)]", "[(]performance[)]", "[(]portability[)]", "[(]information[)]"];
	
	for (var i = 0; i < sentences.length - 1; i++)
	{
		for (var j = 0; j < types.length; j++)
		{
			if (sentences[i].match(types[j]) != null)
			{
				count[types[j].slice(3, -3)] += 1;
				break;
			}
		}			
		
	}
	console.log(count);
	
	var badness = finalScore(count);
	console.log("Badness Score : " + badness);
	
}


function readMyFile(path)
{
	var fs = createFileSystem();
	/*
	fs.readFile(
					path,
					'utf8',
					function(error, data) 
					{
						if (error)
						{
							throw error;
						}
						getScore(data);
					}
				)
				
	console.log("read");*/
	let content
	try 
	{
		content = fs.readFileSync(path, 'utf-8')
	} 
	catch(ex) 
	{
		console.log(ex)
	}
	getScore(content);
					
}

function analyseFile(codeFile, errorFile)
{
	cmd.run('cppcheck' + ' ' + codeFile + ' 2> ' + errorFile);
	//console.log("inside analyse");
}
	


var cmd = require('node-cmd');

var codeFile = 'sample.c';
var errorFile = 'result.txt';

analyseFile(codeFile, errorFile);

setTimeout(function(){readMyFile(errorFile);},500);

		
	