var neo4j = require('neo4j');

//var db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');
var db = new neo4j.GraphDatabase('http://csbook:dcjRP6fx3SASr7qahZAm@hobby-pfdkjfjnbmnagbkehhfjddnl.dbs.graphenedb.com:24789/db/data/');

module.exports = {

  checkIfProfileExists: function(req, res){
    console.log(db);
  	db.cypher({
  		query: 'MATCH (u:User {username: {username}, password:{password}}) RETURN u',
  		params: {
  			username: req.username,
  			password: req.password,
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
  }

};
