
/*
 * GET home page.
 */
module.exports = {

	landing: function(req, res){
		  res.render('login', { title: 'CSBook' });
      // TODO: check if there is username username/password cookie combo
      //        - if there is, send the user to their newsfeed page
      //        - if there isn't, send it to login page
	},

  signUp: function(req, res){
		  res.render('signUp');
	},

	newsFeed: function(req, res){
		res.render('newsFeed');
	}
};
