var express = require('express');
var app = express();

app.use(express.static('Release'));
app.use(express.static('include'));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root : __dirname });
});

app.use('/docs', express.static('docs'))

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});