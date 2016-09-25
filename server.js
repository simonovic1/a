var express = require('express')
  , http    = require('http')
  , fs      = require('fs')
  //, curl    = require('curlrequest') // TODO: if there's no way authentication.dll is working properly

  // csbook routes
  , index   = require('./routes/index')
  , login   = require('./routes/login')
  , db4j    = require('./routes/db4j');
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


app.get('/', index.landing);
app.get('/signUp', index.signUp);
app.get('/userProfile', index.userProfile)

app.get('/loginCheck', function(req, res) {
	console.log("Started login check");
	var toRet = login.check(req.query.username, req.query.password);
	console.log("Finished login check, "+ toRet);

	//set cookie to client
	res.cookie(userNameCookieName, req.query.username, {maxAge: 1000 * 60, httpOnly:true});
	res.writeHead(200, {
		'Content-Type': 'application/json',
		"Access-Control-Allow-Origin":"*",
		});

	res.write(JSON.stringify(toRet));
	res.end();
});

app.get('/checkIfProfileExists', db4j.checkIfProfileExists);
app.get('/createProfile', db4j.createProfile);

app.post('/pictureUpload', function(req, res) {
  
  fs.readFile(req.files.file.path, function (err, data) {
    var new_path = __dirname + "public/users/pictures/" + req.files.file.name;
	console.log(new_path);
    fs.writeFile(new_path, data, function (err) {
      res.redirect("back");
    });
  });

})

server.listen(app.get('port'), function(){
  console.log('CSBook Server listening on port ' + app.get('port'));
});
