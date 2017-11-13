var express = require('express');
var router = express.Router();

var fs = require('fs');

// AWS stuff
var awsCli = require('aws-cli-js');
var Options = awsCli.Options;
var Aws = awsCli.Aws;
var aws = new Aws(options);
var options = new Options(
  /* accessKey    */ 'AKIAIEWHW44PNSPKSWOQ',
  /* secretKey    */ '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',
  /* currentWorkingDirectory */ null
);

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/code', function(req, res, next) {
	res.render('code', { title: 'Solve' });
  });

router.post('/code' , function(req, res, next) {
	res.render('code', { title: 'Solve' });
});

router.post('/compilecode', function(req, res, next) {
  	var code = req.body.code;
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    // Store code in bucket
    fs.writeFile("cache/tmp.cpp", code, function(err) {
      if(err) return console.log(err);
      aws.command('s3 cp cache/tmp.cpp s3://sourcecodestore/file1.cpp')
      .then((data) => {
        console.log(data);
      });
    });

    if(inputRadio === "true")
        {
        	var envData = { OS : "linux" , cmd : "gcc"};
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
        			res.send(data.error);
        		}
        		else
        		{
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {

	   	var envData = { OS : "linux" , cmd : "gcc"};
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
        		res.send(data.error);
        	}
        	else
        	{
        		res.send(data.output);
        	}

            });
	   }

});

module.exports = router;
