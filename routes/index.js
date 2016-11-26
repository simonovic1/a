module.exports = {

	landing: function(req, res){
		  res.render('login', { title: 'CSBook Login' });
      // TODO: check if there is username username/password cookie combo
      //        - if there is, send the user to their newsfeed page
      //        - if there isn't, send it to login page
	},
 
  	signUp: function(req, res){
		res.render('signUp', { title: 'CSBook Sign Up' });
	},
	
	newsfeed: function(req, res){
		res.render('newsfeed', { title: 'CSBook' }); 
	},

	newsFeed: function(req, res){
		res.render('newsFeed', { title: 'CSBook' }); 
	},

	coursePosts: function(req, res){
		  res.render('coursePosts'); 
	},	
	
	aboutPage: function(req, res){
			res.render('aboutPage', { title: 'CSBook' }); 
	},
	coursePage: function(req, res){
			res.render('coursePage', { title: 'CSBook' }); 
	},
};
