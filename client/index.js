var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
