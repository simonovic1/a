var express = require('express')
  , http = require('http')
  , index = require('./routes/simon')
  , login = require('./routes/login_check')
  , db4j = require('./routes/db4j');
  //, path = require('path');

var app = express();
var server = http.createServer(app);

//constants
var userNameCookieName = "username";

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


app.get('/checkLogin', function(req, res) {
	console.log("Login check");
	var toRet = login.check(req.query.username, req.query.password);
	console.log("Login check finished");
	console.log(toRet);

	//set cookie to client
	res.cookie(userNameCookieName, req.query.username, {maxAge: 1000 * 60, httpOnly:true});
	res.writeHead(200, {
		'Content-Type': 'application/json',
		"Access-Control-Allow-Origin":"*",
		});

	res.write(JSON.stringify(toRet));
	res.end();


});
app.get('/checkIfProfileExists', db4j.checkIfProfileExists)
app.get('/signUp', index.signUp);

server.listen(app.get('port'), function(){
  console.log('cs-book server listening on port ' + app.get('port'));
});
