// eslint-disable
var express = require('express');
var config = require('config');
var app = express();

// Make the public folder avaiable
app.use(express.static('public'));

// Use EJS (Embedded JavaScript) as our server side templating engine
// views is the default folder to look for templates
app.set('view engine', 'ejs');

// Make the scripts avaiable to us on every call
app.use(function (req, res, next) {
	// Populate our locals with the config file
	res.locals.scripts = config.get('scripts');
	res.locals.stylesheets = config.get('stylesheets');
	next();
});

app.get('/', function (req, res) {
	res.render('page/index.ejs');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
