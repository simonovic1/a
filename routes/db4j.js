var neo4j = require('neo4j');

//var db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');
var db = new neo4j.GraphDatabase("http://csbook:dcjRP6fx3SASr7qahZAm@hobby-pfdkjfjnbmnagbkehhfjddnl.dbs.graphenedb.com:24789");

var thisModule = module.exports = {

  checkIfProfileExists: function(req, res){

    db.cypher({
  		query: 'MATCH (u:User {username: {username}, password:{password}}) RETURN u',
  		params: {
  			username: req.query.username,
  			password: req.query.password,
  		},
  	}, function (err, results) {
  		if (err) throw err;

      var result = results[0];
  		if (!result) {
  			console.log('No user found.');
  			res.writeHead(200, {
  				'Content-Type': 'application/json',
  				"Access-Control-Allow-Origin":"*",
  			});

  			res.write(JSON.stringify(false));
  			res.end();
  		} else {
  			var user = result['u'];
  			console.log(JSON.stringify(user, null, 4));
  			res.writeHead(200, {
  				'Content-Type': 'application/json',
  				"Access-Control-Allow-Origin":"*",
  			});

  			res.write(JSON.stringify(true));
  			res.end();
  		}
  	});
  },

  createProfile: function(req,res){

  	db.cypher({
  		query: 'CREATE (u:User {username: {username}, password: {password}, indexNumber: {indexNumber}, firstName: {firstName}, lastName: {lastName}, picture:{picture}})',
  		params: {
  			username: req.query.username,
  			password: req.query.password,
  			indexNumber: req.query.indexNumber,
  			picture: req.query.picture,
  			firstName: req.query.firstName,
  			lastName: req.query.lastName,
  		},
  	}, function (err, results) {
  		if (err) throw err;
  		var result = results[0];
  		if (!result) {
  			console.log('Error creating user');

  			res.writeHead(200, {
  				'Content-Type': 'application/json',
  				"Access-Control-Allow-Origin":"*",
  			});

  			res.write(JSON.stringify(false));
  			res.end();
  		} else {
  			res.writeHead(200, {
  				'Content-Type': 'application/json',
  				"Access-Control-Allow-Origin":"*",
  			});

  			res.write(JSON.stringify(true));
  			res.end();
  		}
  	});
  },

	getUserByUsername : function(req,res){

	db.cypher({
		query: 'MATCH (u:User {username: {username}}) RETURN u',
		params: {
			username: req.query.username,
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error creating user');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var user = result['u'];
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(user, null, 4));
			res.end();
		}
	})},

	editUserProfilePicture : function(req,res){

		db.cypher({
			query: 'MATCH (u:User {username: {username}}) SET u.picture = {picture} RETURN u',
			params: {
				username: req.query.username,
				picture: req.query.picture
			},
		}, function (err, results) {
			if (err) throw err;
			var result = results[0];
			if (!result) {
				console.log('Error edit profile user');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(true, null, 4));
				res.end();
			}
		})},

getAllCourses : function(req,res){

	db.cypher({
		query: 'MATCH (c:Course) RETURN c',
		params: {
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('No courses found');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var courses = [];

			for(var i =0; i< results.length; i++)
			{
				courses.push(results[i]['c']);
			}

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(courses, null, 4));
			res.end();
		}
	});
},
	getCourseByName : function(req,res){

	db.cypher({
		query: 'MATCH (c:Course{name:{name}}) RETURN c',
		params: {
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;

		var result = results[0];
		if (!result) {
			console.log('No courses found');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var course = result['c'];

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(course, null, 4));
			res.end();
		}
	});
},

userFollow : function(req,res){

	db.cypher({
		query: 'MATCH (u:User {username:{username}}), (c:Course {name:{name}}) CREATE (u)-[:FOLLOW]->(c)',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error creating follow');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

userSubscribe : function(req,res){

	db.cypher({
		query: 'MATCH (u:User {username:{username}}), (c:Course {name:{name}}) CREATE (u)-[:SUBSCRIBE]->(c)',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error creating follow');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

userUnfollow : function(req,res){

	db.cypher({
		query: 'MATCH (User {username:{username}})-[r:FOLLOW]->(Course {name:{name}}) DELETE r',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error unfollow course');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

userUnsubscribe : function(req,res){

	db.cypher({
		query: 'MATCH (User {username:{username}})-[r:SUBSCRIBE]->(Course {name:{name}}) DELETE r',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error unfollow course');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},
	getTimetableInfo: function(req,res){

	db.cypher({
		query: 'MATCH (User {username:{username}})-[r:FOLLOW]->(c:Course) RETURN c',
		params: {
			username: req.query.username,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('No courses found');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var courses = [];

			for(var i =0; i< results.length; i++)
			{
				var obj = new Object();
				obj.name = results[i]['c']['properties']['name'];
				var lectTime = results[i]['c']['properties']['lectureTimeStart'].split(":");
				obj.lectureDay = results[i]['c']['properties']['lectureDay'];
				obj.lectureHour  = parseInt(lectTime[0]);
				obj.lectureMinute  = parseInt(lectTime[1]);
				obj.lectureDuration = results[i]['c']['properties']['lectureDuration'];
				obj.lectureClassrom = results[i]['c']['properties']['lectureClassroom'];

				obj.lectureGroupDay = [];
				obj.lectureGroupHour = [];
				obj.lectureGroupMinute = [];
				obj.lectureGroupDuration = [];
				obj.lectureGroupClassroom = [];
				for(var j = 0; j < results[i]['c']['properties']['lectureGroupTimeStart'].length; j++)
				{
					var lectGroupTime = results[i]['c']['properties']['lectureGroupTimeStart'][j].split(":");
					obj.lectureGroupDay.push(results[i]['c']['properties']['lectureGroupDay'][j]);
					obj.lectureGroupHour.push(parseInt(lectGroupTime[0]));
					obj.lectureGroupMinute.push(parseInt(lectGroupTime[1]));
					obj.lectureGroupDuration.push(results[i]['c']['properties']['lectureGroupDuration'][j]);
					obj.lectureGroupClassroom.push(results[i]['c']['properties']['lectureGroupClassroom'][j]);
				}

				obj.laboratoryDay = [];
				obj.laboratoryHour = [];
				obj.laboratoryMinute = [];
				obj.laboratoryDuration = [];
				obj.laboratoryClassroom = [];
				for(var j = 0; j < results[i]['c']['properties']['laboratoryTimeStart'].length; j++)
				{
					var laboratoryTime = results[i]['c']['properties']['laboratoryTimeStart'][j].split(":");
					obj.laboratoryDay.push(results[i]['c']['properties']['laboratoryDay'][j]);
					obj.laboratoryHour.push(parseInt(laboratoryTime[0]));
					obj.laboratoryMinute.push(parseInt(laboratoryTime[1]));
					obj.laboratoryDuration.push(results[i]['c']['properties']['laboratoryDuration'][j]);
					obj.laboratoryClassroom.push(results[i]['c']['properties']['laboratoryClassroom'][j]);
				}

				//var jsonString= JSON.stringify(obj);
				courses.push(obj);
			}

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(courses, null, 4));
			res.end();
		}
	});
},

	getAllSubscribedCourses : function(req,res){

	db.cypher({
		query: 'MATCH (User {username:{username}})-[r:SUBSCRIBE]->(c:Course) RETURN c',
		params: {
			username: req.query.username,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('No courses found');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var courses = [];

			for(var i =0; i< results.length; i++)
			{
				courses.push(results[i]['c']);
			}

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(courses, null, 4));
			res.end();
		}
	});
},

checkIfUserIsFollowingCourse : function(req, res){
	db.cypher({
		query: 'MATCH (User {username:{username}})-[r:FOLLOW]->(Course {name:{name}}) RETURN r',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('No follow relationship found');
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

checkIfUserSubscribedToCourse : function(req, res){
	db.cypher({
		query: 'MATCH (User {username:{username}})-[r:SUBSCRIBE]->(Course {name:{name}}) RETURN r',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('No subscribe relationship found');
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},
	createReview : function(req,res){

	db.cypher({
		query: 'CREATE (r:Review {text:{text},upvote:{upvote},downvote:{downvote}}) RETURN ID(r)',
		params: {
			text: req.query.text,
			upvote: 0,
			downvote: 0,
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error creating review');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var id = result['ID(r)'];
			thisModule.userPostReview({username: req.query.username, review_id:id, course_name: req.query.name},res);
		}
	});
},

userPostReview : function(req,res){

	db.cypher({
		query: 'MATCH (r:Review),(u:User {username:{username}}) WHERE ID(r) = {id} CREATE (u)-[:POST_REVIEW]->(r)',
		params: {
			username: req.username,
			id: req.review_id,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error creating follow');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			thisModule.createCourseReview(req,res)
		}
	});
},

createCourseReview : function(req,res){

	db.cypher({
		query: 'MATCH (r:Review),(c:Course {name:{name}}) WHERE ID(r) = {id} CREATE (c)-[:HAS_REVIEW]->(r)',
		params: {
			name: req.course_name,
			id: req.review_id,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error creating follow');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},
	checkIfUserPostedReview : function(req, res){
	db.cypher({
		query: 'MATCH (User {username:{username}})-[r1:POST_REVIEW]->(r),(Course {name:{name}})-[r2:HAS_REVIEW]->(r) RETURN r',
		params: {
			username: req.query.username,
			name: req.query.name,
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('No review found');
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var review = result['r'];
			console.log(JSON.stringify(review, null, 4));
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},
	upvoteReview : function(req,res){

	db.cypher({
		query: 'MATCH (r:Review) WHERE ID(r)={id} SET r.upvote =  r.upvote + 1 RETURN r.upvote',
		params: {
			id: parseInt(req.query.id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error voting');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {

			thisModule.userUpvoteReview({username: req.query.username, review_id:req.query.id},res);
		}
	});
},

userUpvoteReview : function(req,res){

	db.cypher({
		query: 'MATCH (u:User {username:{username}}), (r:Review) WHERE ID(r)={id} CREATE (u)-[u1:UPVOTE]->(r) RETURN u1',
		params: {
			username: req.username,
			id: parseInt(req.review_id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error user voting');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

downvoteReview : function(req,res){

	db.cypher({
		query: 'MATCH (r:Review) WHERE ID(r)={id} SET r.downvote =  r.downvote + 1 RETURN r.downvote',
		params: {
			id: parseInt(req.query.id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error voting 2');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {

			thisModule.userDownvoteReview({username: req.query.username, review_id:req.query.id},res);
		}
	});
},

userDownvoteReview : function(req,res){

	db.cypher({
		query: 'MATCH (u:User {username:{username}}), (r:Review) WHERE ID(r)={id} CREATE (u)-[d1:DOWNVOTE]->(r) RETURN d1',
		params: {
			username: req.username,
			id: parseInt(req.review_id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error user voting 2');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

checkIfUserVoted : function(req, res){
	db.cypher({
		query: 'MATCH (User {username:{username}})-[r1:UPVOTE]->(r) WHERE ID(r)={id} RETURN r',
		params: {
			username: req.query.username,
			id: parseInt(req.query.id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			thisModule.checkIfUserDownvoted(req,res);
		} else {
			var review = result['r'];
			console.log(JSON.stringify(review, null, 4));
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

checkIfUserDownvoted : function(req, res){
	db.cypher({
		query: 'MATCH (User {username:{username}})-[r1:DOWNVOTE]->(r) WHERE ID(r)={id} RETURN r',
		params: {
			username: req.query.username,
			id: parseInt(req.query.id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('No review found');
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var review = result['r'];
			console.log(JSON.stringify(review, null, 4));
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(true));
			res.end();
		}
	});
},

	totalUpvotes : function(req, res){
	db.cypher({
		query: 'MATCH (r:Review) WHERE ID(r)={id} RETURN r.upvote',
		params: {
			id: parseInt(req.query.id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error geting upvotes');
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var upvote = result['r.upvote'];
			console.log(JSON.stringify(upvote, null, 4));
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(upvote));
			res.end();
		}
	});
},
	totalDownvotes : function(req, res){
	db.cypher({
		query: 'MATCH (r:Review) WHERE ID(r)={id} RETURN r.downvote',
		params: {
			id: parseInt(req.query.id),
		},
	}, function (err, results) {
		if (err) throw err;
		var result = results[0];
		if (!result) {
			console.log('Error geting downvotes');
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var downvote = result['r.downvote'];
			console.log(JSON.stringify(downvote, null, 4));
			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(downvote));
			res.end();
		}
	});
},

	getAllFollowedCourses : function(req,res){

		db.cypher({
			query: 'MATCH (User {username:{username}})-[r:FOLLOW]->(c:Course) RETURN c',
			params: {
				username: req.query.username,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No courses found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var courses = [];

				for(var i =0; i< results.length; i++)
				{
					courses.push(results[i]['c']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(courses, null, 4));
				res.end();
			}
		});
	},
	createPost : function(req,res){

	db.cypher({
		query: 'CREATE (p:Post {picture: {picture}, username: {username}, date: {date}, time: {time}, text: {text}, tags: {tags}}) RETURN ID(p)',
		params: {
			picture : req.query.picture,
			username : req.query.username,
			date : req.query.date,
			time : req.query.time,
			text: req.query.text,
			tags: req.query.tags,
		},
	}, function (err, results) {
		if (err) throw err;

		if (!results) {
			console.log('Error creating post');

			res.writeHead(200, {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin":"*",
			});

			res.write(JSON.stringify(false));
			res.end();
		} else {
			var id = results[0]['ID(p)'];
			thisModule.userPostedPost({indexNo: req.query.indexNo, postID : id, courseName: req.query.courseName, tags: req.query.tags},res);
		}
	});
},
	userPostedPost : function(req,res){

		db.cypher({
			query: 'MATCH (p:Post),(u:User{indexNumber: {indexNo}}) WHERE ID(p)={id} CREATE (u)-[:POSTED_POST]->(p)',
			params: {
				indexNo : req.indexNo,
				id : req.postID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error user posted post');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				thisModule.courseHasPost({postID : req.postID, courseName: req.courseName, tags: req.tags},res);
			}
		});
	},
	courseHasPost : function(req,res){

		db.cypher({
			query: 'MATCH (p:Post),(c:Course{name: {courseName}}) WHERE ID(p)={id} CREATE (c)-[:HAS_POST]->(p)',
			params: {
				courseName : req.courseName,
				id : req.postID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error course has post');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				for(var i =0; i < req.tags.length; i++)
				{
					thisModule.createTag({postID : req.postID, courseName: req.courseName, tagName: req.tags[i]},res);
				}

				res.write(JSON.stringify(true));
				res.end();
			}
		});
	},
	createTag : function(req,res){

		db.cypher({
			query: 'MERGE (t:Tag {name: {tagName}}) RETURN ID(t)',
			params: {
				tagName : req.tagName,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error create tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var id = results[0]['ID(t)'];
				thisModule.postHasTag({postID : req.postID, tagID: id},res);
			}
		});
	},
	postHasTag : function(req,res){

		db.cypher({
			query: 'MATCH (p:Post),(t:Tag) WHERE ID(p)={postID} AND ID(t)={tagID} CREATE (p)-[:HAS_TAG]->(t)',
			params: {
				postID : req.postID,
				tagID : req.tagID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error post has tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

			}
		});
	},

	getAllPosts : function(req,res){

		db.cypher({
			query: 'MATCH (p:Post) return p',
			params: {

			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error post has tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var posts = [];

				for(var i =0; i< results.length; i++)
				{
					posts.push(results[i]['p']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(posts, null, 4));
				res.end();
				
			}
		});
	},

	createEvent : function(req,res){

		db.cypher({
			query: 'CREATE (e:Event {picture: {picture}, username: {username}, date: {date}, time: {time}, eventDate: {eventDate},' +
			'eventTime: {eventTime},title: {title}, text:{text}, type:{type}, courseName: {courseName}, tags: {tags}}) RETURN ID(e)',
			params: {
				picture : req.query.picture,
				username : req.query.username,
				date : req.query.date,
				time : req.query.time,
				eventDate : req.query.eventDate,
				eventTime : req.query.eventTime,
				title: req.query.title,
				text: req.query.text,
				type: req.query.type,
				courseName: req.query.courseName,
				tags: req.query.tags,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error creating event');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var id = results[0]['ID(e)'];
				thisModule.createNotification({indexNo: req.query.indexNo, postID : id, courseName: req.query.courseName, tags: req.query.tags, title: req.query.title, text:req.query.text, type: req.query.type},res);
			}
		});
	},
	createNotification : function(req,res){

		db.cypher({
			query: 'MATCH (u:User)-[s:SUBSCRIBE]->(c:Course{name:{courseName}})WHERE (u.indexNumber <> {indexNo}) ' +
			'CREATE (u)-[:HAS_NOTIFICATION]->(n:Notification {name:{title}, text:{text}, type:{type}, courseName:{courseName}, eventID: {postID}}) RETURN u',
			params: {
				courseName : req.courseName,
				indexNo: req.indexNo,
				title: req.title,
				text: req.text,
				type: req.type,
				postID: req.postID
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error user has notification');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				thisModule.userPostedEvent({indexNo: req.indexNo, postID : req.postID, courseName: req.courseName, tags: req.tags},res);
			}
		});
	},
	userPostedEvent : function(req,res){

		db.cypher({
			query: 'MATCH (e:Event),(u:User{indexNumber: {indexNo}}) WHERE ID(e)={id} CREATE (u)-[:POSTED_EVENT]->(e)',
			params: {
				indexNo : req.indexNo,
				id : req.postID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error user posted event');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				thisModule.courseHasEvent({postID : req.postID, courseName: req.courseName, tags: req.tags},res);
			}
		});
	},
	courseHasEvent : function(req,res){

		db.cypher({
			query: 'MATCH (e:Event),(c:Course{name: {courseName}}) WHERE ID(e)={id} CREATE (c)-[:HAS_EVENT]->(e)',
			params: {
				courseName : req.courseName,
				id : req.postID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error course has event');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				for(var i =0; i < req.tags.length; i++)
				{
					thisModule.createTagForEvent({postID : req.postID, courseName: req.courseName, tagName: req.tags[i]},res);
				}

				res.write(JSON.stringify(true));
				res.end();
			}
		});
	},
	createTagForEvent : function(req,res){

		db.cypher({
			query: 'MERGE (t:Tag {name: {tagName}}) RETURN ID(t)',
			params: {
				tagName : req.tagName,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error create tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var id = results[0]['ID(t)'];
				thisModule.eventHasTag({postID : req.postID, tagID: id},res);
			}
		});
	},
	eventHasTag : function(req,res){

		db.cypher({
			query: 'MATCH (e:Event),(t:Tag) WHERE ID(e)={postID} AND ID(t)={tagID} CREATE (e)-[:HAS_TAG]->(t)',
			params: {
				postID : req.postID,
				tagID : req.tagID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error event has tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

			}
		});
	},

	getAllEvents : function(req,res){

		db.cypher({
			query: 'MATCH (e:Event) return e',
			params: {

			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error get all event');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var events = [];

				for(var i =0; i< results.length; i++)
				{
					events.push(results[i]['e']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(events, null, 4));
				res.end();

			}
		});
	},

	createPoll : function(req,res){

		db.cypher({
			query: 'CREATE (p:Poll {picture: {picture}, username: {username}, date: {date}, time: {time},text: {text}, deadline: {deadline} tags: {tags}, optionNum: {optionNum}}) RETURN ID(p)',
			params: {
				picture : req.query.picture,
				username : req.query.username,
				date : req.query.date,
				time : req.query.time,
				text: req.query.text,
				deadline: req.query.deadline,
				tags: req.query.tags,
				optionNum: req.query.options.length,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error creating poll');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var id = results[0]['ID(p)'];
				thisModule.userPostedPoll({indexNo: req.query.indexNo, postID : id, courseName: req.query.courseName, tags: req.query.tags, options: req.query.options},res);
			}
		});
	},
	userPostedPoll : function(req,res){

		db.cypher({
			query: 'MATCH (p:Poll),(u:User{indexNumber: {indexNo}}) WHERE ID(p)={id} CREATE (u)-[:POSTED_POLL]->(p)',
			params: {
				indexNo : req.indexNo,
				id : req.postID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error user posted poll');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				thisModule.courseHasPoll({postID : req.postID, courseName: req.courseName, tags: req.tags, options: req.options},res);
			}
		});
	},
	courseHasPoll : function(req,res){

		db.cypher({
			query: 'MATCH (p:Poll),(c:Course{name: {courseName}}) WHERE ID(p)={id} CREATE (c)-[:HAS_POLL]->(p)',
			params: {
				courseName : req.courseName,
				id : req.postID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error course has poll');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				for(var i =0; i < req.tags.length; i++)
				{
					thisModule.createTagForPoll({postID : req.postID, courseName: req.courseName, tagName: req.tags[i]},res);
				}
				for(var i =0; i < req.options.length; i++)
				{
					thisModule.createOptionForPoll({postID : req.postID, option: req.options[i]},res);
				}

				res.write(JSON.stringify(true));
				res.end();
			}
		});
	},
	createTagForPoll : function(req,res){

		db.cypher({
			query: 'MERGE (t:Tag {name: {tagName}}) RETURN ID(t)',
			params: {
				tagName : req.tagName,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error create tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var id = results[0]['ID(t)'];
				thisModule.pollHasTag({postID : req.postID, tagID: id},res);
			}
		});
	},
	pollHasTag : function(req,res){

		db.cypher({
			query: 'MATCH (p:Poll),(t:Tag) WHERE ID(p)={postID} AND ID(t)={tagID} CREATE (p)-[:HAS_TAG]->(t)',
			params: {
				postID : req.postID,
				tagID : req.tagID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error event has tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

			}
		});
	},
	createOptionForPoll : function(req,res){

		db.cypher({
			query: 'CREATE (o:Option {name: {option}, votes: 0}) RETURN ID(o)',
			params: {
				option : req.option,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error create tag');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var id = results[0]['ID(o)'];
				thisModule.pollHasOption({postID : req.postID, optionID: id},res);
			}
		});
	},
	pollHasOption : function(req,res){

		db.cypher({
			query: 'MATCH (p:Poll),(o:Option) WHERE ID(p)={postID} AND ID(o)={optionID} CREATE (p)-[:HAS_OPTION]->(o)',
			params: {
				postID : req.postID,
				optionID : req.optionID,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error pool has option');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

			}
		});
	},

	getAllPolls : function(req,res){

		db.cypher({
			query: 'MATCH (p:Poll),(o:Option) WHERE (p)-[:HAS_OPTION]->(o) RETURN p,o',
			params: {

			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('Error get all polls');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var polls = [];


				for(var i =0; i< results.length;) {
					var obj = new Object();
					obj.id = parseInt(results[i]['p']['_id']);
					obj.time = results[i]['p']['properties']['time'];
					obj.date = results[i]['p']['properties']['date'];
					obj.text = results[i]['p']['properties']['text'];
					obj.tags = results[i]['p']['properties']['tags'];
					obj.picture = results[i]['p']['properties']['picture'];
					obj.username = results[i]['p']['properties']['username'];
					var optionNum = parseInt(results[i]['p']['properties']['optionNum']);
					var options = [];
					for(var j = i; j < i+optionNum; j++)
					{
						options.push(results[j]['o']['properties']);
					}
					i = i + optionNum;
					obj.options = options;
					polls.push(obj)
				}

					res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(polls, null, 4));
				res.end();

			}
		});
	},

	voteOption : function(req, res){
		db.cypher({
			query: 'MATCH (u:User {username:{username}}), (p:Poll), (o:Option), (p)-[h:HAS_OPTION]->(o)<-[v:VOTE_POLL]-(u) WHERE ID(p)={id} RETURN v',
			params: {
				username: req.query.username,
				id: parseInt(req.query.id),
			},
		}, function (err, results) {
			if (err) throw err;
			var result = results[0];
			if (!result) {
				thisModule.userVoteOption({username: req.query.username, id: req.query.id, name: req.query.name}, res);
			} else {
				thisModule.poolOptionDecrement({username: req.query.username, id: req.query.id, name: req.query.name}, res);
			}
		});
	},

	userVoteOption : function(req,res){

		db.cypher({
			query: 'MATCH (u:User {username:{username}}), (p:Poll), (o:Option {name:{name}}), (p)-[HAS_OPTION]->(o) WHERE ID(p)={id} CREATE (u)-[u1:VOTE_POLL]->(o) RETURN u1',
			params: {
				username: req.username,
				name: req.name,
				id: parseInt(req.id),
			},
		}, function (err, results) {
			if (err) throw err;
			var result = results[0];
			if (!result) {
				console.log('Error user voting');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

				thisModule.poolOptionIncrement({id: req.id, name: req.name},res);
			}
		});
	},
	poolOptionIncrement : function(req,res){

		db.cypher({
			query: 'MATCH (p:Poll), (o:Option {name: {name}}), (p)-[:HAS_OPTION]->(o) WHERE ID(p)={id} SET o.votes =  o.votes + 1 RETURN o.votes',
			params: {
				id: parseInt(req.id),
				name: req.name
			},
		}, function (err, results) {
			if (err) throw err;
			var result = results[0];
			if (!result) {
				console.log('Error voting');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(true));
				res.end();
			}
		});
	},
	deleteVoteOption : function(req, res){
		db.cypher({
			query: 'MATCH (u:User {username:{username}}), (p:Poll), (o:Option), (p)-[HAS_OPTION]->(o)<-[v:VOTE_POLL]-(u) WHERE ID(p)={id} DELETE v RETURN true',
			params: {
				username: req.username,
				id: parseInt(req.id),
			},
		}, function (err, results) {
			if (err) throw err;
			var result = results[0];
			if (!result) {
				
			} else {
				thisModule.userVoteOption({username: req.username, id: req.id, name: req.name}, res);
			}
		});
	},
	poolOptionDecrement : function(req,res){

		db.cypher({
			query: 'MATCH (u:User {username:{username}}), (p:Poll), (o:Option), (p)-[HAS_OPTION]->(o)<-[v:VOTE_POLL]-(u) WHERE ID(p)={id} SET o.votes =  o.votes - 1 RETURN o.votes',
			params: {
				username: req.username,
				id: parseInt(req.id),
			},
		}, function (err, results) {
			if (err) throw err;
			var result = results[0];
			if (!result) {
				console.log('Error voting');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {

				thisModule.deleteVoteOption({username: req.username, id: req.id, name: req.name}, res);
			}
		});
	},

	getAllCoursePosts : function(req,res){

		db.cypher({
			query: 'MATCH (Course {name:{name}})-[r:HAS_POST]->(p:Post) RETURN p',
			params: {
				name: req.query.name,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No posts found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var posts = [];

				for(var i =0; i< results.length; i++)
				{
					posts.push(results[i]['p']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(posts, null, 4));
				res.end();
			}
		});
	},
	getAllCourseEvents : function(req,res){

		db.cypher({
			query: 'MATCH (Course {name:{name}})-[r:HAS_EVENT]->(e:Event) RETURN e',
			params: {
				name: req.query.name,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No events found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var events = [];

				for(var i =0; i< results.length; i++)
				{
					events.push(results[i]['e']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(events, null, 4));
				res.end();
			}
		});
	},
	getAllCoursePolls : function(req,res){

		db.cypher({
			query: 'MATCH (Course {name:{name}})-[r:HAS_POLL]->(p:Poll)-[:HAS_OPTION]->(o:Option) RETURN p,o',
			params: {
				name: req.query.name,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No polls found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var polls = [];

				for(var i =0; i< results.length;) {
					var obj = new Object();
					obj.id = parseInt(results[i]['p']['_id']);
					obj.time = results[i]['p']['properties']['time'];
					obj.date = results[i]['p']['properties']['date'];
					obj.text = results[i]['p']['properties']['text'];
					obj.tags = results[i]['p']['properties']['tags'];
					obj.picture = results[i]['p']['properties']['picture'];
					obj.username = results[i]['p']['properties']['username'];
					var optionNum = parseInt(results[i]['p']['properties']['optionNum']);
					var options = [];
					for(var j = i; j < i+optionNum; j++)
					{
						options.push(results[j]['o']['properties']);
					}
					i = i + optionNum;
					obj.options = options;
					polls.push(obj)
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(polls, null, 4));
				res.end();
			}
		});
	},

	getUsersNewsFeedPosts : function(req,res){

		db.cypher({
			query: 'MATCH (User {username:{username}})-[f:FOLLOW]->(c:Course)-[r:HAS_POST]->(p:Post) RETURN p',
			params: {
				username: req.query.username,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No posts found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var posts = [];

				for(var i =0; i< results.length; i++)
				{
					posts.push(results[i]['p']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(posts, null, 4));
				res.end();
			}
		});
	},
	getUsersNewsFeedEvents : function(req,res){

		db.cypher({
			query: 'MATCH (User {username:{username}})-[f:FOLLOW]->(c:Course)-[r:HAS_EVENT]->(e:Event) RETURN e',
			params: {
				username: req.query.username,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No events found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var events = [];

				for(var i =0; i< results.length; i++)
				{
					events.push(results[i]['e']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(events, null, 4));
				res.end();
			}
		});
	},
	getUsersNewsFeedPolls : function(req,res){

		db.cypher({
			query: 'MATCH (User {username:{username}})-[f:FOLLOW]->(c:Course)-[r:HAS_POLL]->(p:Poll)-[:HAS_OPTION]->(o:Option) RETURN p,o',
			params: {
				username: req.query.username,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No polls found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var polls = [];

				for(var i =0; i< results.length;) {
					var obj = new Object();
					obj.id = parseInt(results[i]['p']['_id']);
					obj.time = results[i]['p']['properties']['time'];
					obj.date = results[i]['p']['properties']['date'];
					obj.text = results[i]['p']['properties']['text'];
					obj.tags = results[i]['p']['properties']['tags'];
					obj.picture = results[i]['p']['properties']['picture'];
					obj.username = results[i]['p']['properties']['username'];
					var optionNum = parseInt(results[i]['p']['properties']['optionNum']);
					var options = [];
					for(var j = i; j < i+optionNum; j++)
					{
						options.push(results[j]['o']['properties']);
					}
					i = i + optionNum;
					obj.options = options;
					polls.push(obj)
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(polls, null, 4));
				res.end();
			}
		});
	},

	getAllNotificationsForUser : function(req,res){

		db.cypher({
			query: 'MATCH (User {username:{username}})-[h:HAS_NOTIFICATION]->(n:Notification) RETURN n',
			params: {
				username: req.query.username,
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No notifications found');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				var notifications = [];

				for(var i =0; i< results.length; i++)
				{
					notifications.push(results[i]['n']);
				}

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(notifications, null, 4));
				res.end();
			}
		});
	},
	deleteNotification: function(req,res){

		db.cypher({
			query: 'MATCH (n:Notification) WHERE ID(n) = {id} OPTIONAL MATCH (u:User)-[r:HAS_NOTIFICATION]-(n) DELETE n,r RETURN u',
			params: {
				id: parseInt(req.query.id)
			},
		}, function (err, results) {
			if (err) throw err;

			if (!results) {
				console.log('No success in deliting notification');

				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(false));
				res.end();
			} else {
				
				res.writeHead(200, {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin":"*",
				});

				res.write(JSON.stringify(true, null, 4));
				res.end();
			}
		});
	},
};
