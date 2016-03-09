var express = require('express')
  , index = require('./routes/simon')
  , http = require('http');
  //, path = require('path');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/simon1', index.simonFja1);

app.get('/simon2', index.simonFja2);

server.listen(app.get('port'), function(){
  console.log('cs-book server listening on port ' + app.get('port'));
});






























