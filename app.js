var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res){
	var options = {
		root: __dirname,
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	
	res.sendFile('index.html', options);
})

module.exports = app;
