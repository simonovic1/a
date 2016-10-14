var express = require('express')
  , http    = require('http')
  , fs      = require('fs')

  // csbook routes
  , index   = require('./routes/index')
  //, login   = require('./routes/login')
  , db4j    = require('./routes/db4j');

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
app.get('/newsFeed', index.newsFeed); 
app.get('/coursePosts', index.coursePosts); 

//new newsfeed-page added by Simon
app.get('/newsfeed-page', index.newsfeed); 


/*app.get('/loginCheck', function(req, res) {
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
});*/

app.get('/checkIfProfileExists', db4j.checkIfProfileExists);
app.get('/createProfile', db4j.createProfile);

app.post('/pictureUpload', function(req, res) {
  fs.readFile(req.files.file.path, function (err, data) {
    var new_path = __dirname + "/public/users/pictures/" + req.files.file.name;
	console.log(new_path);
    fs.writeFile(new_path, data, function (err) {
		console.log(err);
      res.redirect("back");
    });
  });

})

app.get('/getUserByUsername', db4j.getUserByUsername);

app.get('/getAllCourses', db4j.getAllCourses);

app.get('/getCourseByName', db4j.getCourseByName);

app.get('/userFollow', db4j.userFollow);

app.get('/userUnfollow', db4j.userUnfollow);

app.get('/userSubscribe', db4j.userSubscribe);

app.get('/userUnsubscribe',db4j.userUnsubscribe);

app.get('/getAllFollowedCourses', db4j.getAllFollowedCourses);

app.get('/getAllSubscribedCourses', db4j.getAllSubscribedCourses);

app.get('/IsFollowing', db4j.checkIfUserIsFollowingCourse);

app.get('/Subscribed', db4j.checkIfUserSubscribedToCourse);

app.get('/createReview', db4j.createReview);

app.get('/checkIfUserPostedReview', db4j.checkIfUserPostedReview);

app.get('/upvoteReview', db4j.upvoteReview);

app.get('/downvoteReview', db4j.downvoteReview);

app.get('/checkIfUserVoted', db4j.checkIfUserVoted);

app.get('/totalUpvotes', db4j.totalUpvotes);

app.get('/totalDownvotes', db4j.totalDownvotes);

app.get('/getTimetableInfo', db4j.getTimetableInfo);

app.get('/createPost', db4j.createPost);

app.get('/getAllPosts', db4j.getAllPosts);

app.get('/createEvent', db4j.createEvent);

app.get('/getAllEvents', db4j.getAllEvents);

app.get('/createPoll', db4j.createPoll);

app.get('/getAllPolls', db4j.getAllPolls);

server.listen(app.get('port'), function(){
  console.log('CSBook Server listening on port ' + app.get('port'));
});
