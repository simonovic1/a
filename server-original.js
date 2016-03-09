//constants
var userNameCookieName = "username";

// CSBook Modules
var loginModule = require('login_check_dll');
var db = require('db-connect');
//
var express = require('express');
var http = require('http');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cors());
app.use(cookieParser());


var server = http.createServer(app);

app.get('/checkLogin', function(req, res) {
	console.log("function called");
	var toRet = loginModule.check(req.query.username, req.query.password);
	console.log("function check finished");
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

app.get('/createUser', function(req, res) {
	var toRet = db.createProfile(req, res);
});

app.get('/checkIfUserExists', function(req, res) {
	db.checkIfProfileExists({username: req.query.username, password: req.query.password},res);	
});

app.get('/getUserByUsername', function(req, res) {
	db.getUserByUsername(req,res);
});

app.get('/getAllCourses', function(req, res) {
	db.getAllCourses(req,res);	
});

app.get('/getCourseByName', function(req, res) {
	db.getCourseByName(req,res);	
});

app.get('/userFollow', function(req, res) {
	db.userFollow(req,res);	
});

app.get('/userUnfollow', function(req, res) {
	db.userUnfollow(req,res);	
});

app.get('/userSubscribe', function(req, res) {
	db.userSubscribe(req,res);	
});

app.get('/userUnsubscribe', function(req, res) {
	db.userUnsubscribe(req,res);	
});

app.get('/userUnsubscribe', function(req, res) {
	db.userUnsubscribe(req,res);
});

app.get('/getAllFollowedCourses', function(req, res) {
	db.getAllFollowedCourses(req,res);
});

app.get('/getAllSubscribedCourses', function(req, res) {
	db.getAllSubscribedCourses(req,res);
});

//in: username, course name, review text
//out: true or false
app.get('/createReview', function(req, res) {
	db.createReview(req,res);
});

//in: username, course name
//out: true or false
app.get('/checkIfUserPostedReview', function(req, res) {
	db.checkIfUserPostedReview(req,res);
});

//in: username, course name
//out: true or false
app.get('/isFollowing', function(req, res) {
	db.checkIfUserIsFollowingCourse(req,res);
});

//in: username, course name
//out: true or false
app.get('/Subscribed', function(req, res) {
	db.checkIfUserSubscribedToCourse(req,res);
});

//in: username, review id
//out: true or false
app.get('/upvoteReview', function(req, res) {
	db.upvoteReview(req,res);
});

//in: username, review id
//out: true or false
app.get('/downvoteReview', function(req, res) {
	db.downvoteReview(req,res);
});

//in: username, review id
//out: true or false
app.get('/checkIfUserVoted', function(req, res) {
	db.checkIfUserVoted(req,res);
});

//in: review id
//out: upvote number
app.get('/totalUpvotes', function(req, res) {
	db.totalUpvotes(req,res);
});

//in: review id
//out: downvote number
app.get('/totalDownvotes', function(req, res) {
	db.totalDownvotes(req,res);
});

server.listen(3000);

// Test function
//db.checkLoginCompany('srboljub','12345');

