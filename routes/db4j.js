var neo4j = require('neo4j');

//var db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');
var db = new neo4j.GraphDatabase("http://csbook:dcjRP6fx3SASr7qahZAm@hobby-pfdkjfjnbmnagbkehhfjddnl.dbs.graphenedb.com:24789");

module.exports = {

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
			exports.userPostReview({username: req.query.username, review_id:id, course_name: req.query.name},res);
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
			exports.createCourseReview(req,res)
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

			exports.userUpvoteReview({username: req.query.username, review_id:req.query.id},res);
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

			exports.userDownvoteReview({username: req.query.username, review_id:req.query.id},res);
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
			exports.checkIfUserDownvoted(req,res);
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
}

};
