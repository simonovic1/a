function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getAllPosts(useremail) {
	$.ajax({
		type: 'GET',
		url: '/getUsersNewsFeedPosts',
		dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 data:{
		   'username': useremail
		  },
		success: function(data){
		//alert(JSON.stringify(data));
		//alert(JSON.stringify(data));
			addPosts(data);
		}
	});
}

function getAllEvents(useremail) {
	$.ajax({
		type: 'GET',
		url: '/getUsersNewsFeedEvents',
		dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 data:{
		   'username': useremail
		  },
		success: function(data){
			addEvents(data);
		}
	});
}


function getAllPolls(useremail) {
	$.ajax({
		type: 'GET',
		url: '/getUsersNewsFeedPolls',
		dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 data:{
		   'username': useremail
		  },
		success: function(data){
			addVotings(data);
		}
	});
}
	
	
	function addPosts(posts)
	{
		$.each(posts , function(i, val) { 
			addPost(posts[i]);
		});
	}
	
	function addPost(json){
		var post = json.properties;
		var tagList = post.tags;
					
		var tagarray = "";		
			

		
		$.each(tagList , function(i, val) { 
		tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
		});
		

	    var str = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><div class=\"panel-image\"><img class=\"img-circle\" width=30 height=30 src=\"users/pictures/" + post.picture + "\"/></div><h3 class=\"panel-title\"   >" + post.username + "</h3><div class=\"rating " + json._id + "\"></div></div><div class=\"panel-date\">" + post.date + "</div></div><div class=\"panel-body\">" + post.text + "</div> <div class=\"panel-footer\">" + tagarray + "</div></div></div>");	

		$("#posts").append(str);	
	}
	
	
	
	function vote(poll_id, poll_name, username)
	{
		$.ajax({
		type: 'GET',
		  url: '/voteOption', // ime f-je sa servera
		  dataType: 'json',
			beforeSend: function (xhr) {
					/* authorization header with token */
					xhr.setRequestHeader("authorization", localStorage.getItem('token'));
			},
		  data:{
		   'id': poll_id,
		   'name': poll_name,
		   'username': username
		  },
		  success: function(data){
			  var progressArray = "";		
			$.each(data , function(i, val) { 
				progressArray += "<div id=\"" + poll_id + "\" class=\"vote-item\"><div class=\"vote-name\">" +  data[i]["name"] + "</div><div class=\"vote-progress\"><div class=\"progress progress-striped\"><div class=\"progress-bar progress-bar-info\" style=\"width:"+ data[i]["votes"] +"%\"></div></div></div><div class=\"vote-percent\"><span>"+data[i]["votes"]+"</span></div><div class=\"vote-button\"><button onclick=\"vote(\'" + poll_id + "\', \'" + data[i]["name"] + "\', \'" + username + "\');\">+</button></div></div>";
			});
			var clas = ".voting." + poll_id;
			$(clas).html(progressArray);
			}
		 });
	}
	
	
	function addVotings(polls)
	{
		$.each(polls , function(i, val) { 
			addVoting(polls[i]);
		});
	}
	
	function addVoting(voting){
		var progressList = voting.options;
		var tagList = voting.tags;
				
		var userEmail = localStorage.getItem("Username");
	
		var progressArray = "";		
		$.each(progressList , function(i, val) { 
			progressArray += "<div id=\"" + voting._id + "\" class=\"vote-item\"><div class=\"vote-name\">" + progressList[i]["name"]+"</div><div class=\"vote-progress\"><div class=\"progress progress-striped\"><div class=\"progress-bar progress-bar-info\" style=\"width:"+progressList[i]["votes"]+"%\"></div></div></div><div class=\"vote-percent\"><span>"+progressList[i]["votes"]+"</span></div><div class=\"vote-button\"><button onclick=\"vote(\'" + voting._id + "\', \'" + progressList[i].name + "\', \'" + userEmail + "\');\">+</button></div></div>";
		});
		
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
		});
		
		var poolStr = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ voting.text+"</h3><div class=\"rating " + voting._id + "\"></div></div><div class=\"panel-date\">"+voting.date+"</div></div><div class=\"panel-body\">"+"Rok za glasanje: <b>"+voting.deadline +"</b></div><div class=\"voting " + voting._id + "\">" + progressArray + "</div><div class=\"panel-footer\">"+tagarray+"</div></div>");
		$("#posts").append(poolStr);	
	}
	
	
	
	
	
	function addEvents(events)
	{
		$.each(events , function(i, val) { 
			addEvent(events[i]);
		});
	}
	
	function addEvent(ev){
		var Event = ev.properties;
		var tagList = Event.tags;
					
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
		});
		
		// var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3></div> </div> <div class=\"panel-body\"><div>Naziv: " + Event.courseName+ "</div><div>Datum: "+ Event.date +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
		
		var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3><div class=\"rating " + ev._id + "\"></div></div><div class=\"panel-date\">" + Event.date + "</div> </div> <div class=\"panel-body\"><div>Datum: <b>" + Event.eventDate + " " + Event.eventTime  + "</b></div><div>Opis: "+ Event.text +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
		$("#posts").append(eventStr);	
	}
	
function courseClicked(rating)
	{
		//getAllElementsByCourse(courseName);
		getCourseFeed( getParameterByName('course'), rating);
	}
	
	
	function getAllElementsByCourse(courseName)
	{
		$.ajax({
		type: 'GET',
		url: '/getAllCoursePosts', 
		  dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		  data:{
		   'name': courseName
		  },
		success: function(data){
		//alert(JSON.stringify(data));
			addPosts(data);
		}
	});
	
	$.ajax({
		type: 'GET',
		url: '/getAllCourseEvents', 
		  dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		  data:{
		   'name': courseName
		  },
		success: function(data){
		//alert(JSON.stringify(data));
			addEvents(data);
		}
	});
	
	$.ajax({
		type: 'GET',
		url: '/getAllCoursePolls', 
		  dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		  data:{
		   'name': courseName
		  },
		success: function(data){
		//alert(JSON.stringify(data));
			addVotings(data);
		}
	});
	}
	
	
	function PerformCourseSearch()
	{
		// debugger;
		
		 var selectize = $('#search-input')[0].selectize;
		 var tagsArray = selectize.getValue().split(',');
		 var course = localStorage.getItem("Course");
		
		var query={};
		query['tags'] = tagsArray;
		query['name'] = course;
		
		console.log(JSON.stringify(query));
		
		if(query["tags"][0] == "")
		{
			getCourseFeed(course,false);
		}
		else
		{
		
			 $.ajax({
			 type: 'GET',
			 url: '/searchAllCourseItemsByTag', 
			   dataType: 'json',
			beforeSend: function (xhr) {
					/* authorization header with token */
					xhr.setRequestHeader("authorization", localStorage.getItem('token'));
			},
			   data:query,
			 success: function(data){
		
				$(".post").remove();
				
				$.each(data , function(i, val) { 
				if(data[i].e != undefined)
					addEvent(data[i].e);
				else if (data[i].p != undefined)
					addPost(data[i].p);
				else 
					addVoting(data[i]);
			});
			
				console.log(JSON.stringify(data));
			 }
		 });
		}
	}
	
	function PerformNewsfeedSearch()
	{
		
		 var selectize = $('#search-input')[0].selectize;
		 var tagsArray = selectize.getValue().split(',');
		
		var query={};
		query['tags'] = tagsArray;
		query['username'] = localStorage.getItem("Username");
		
		console.log(JSON.stringify(query));
		
		if(query["tags"][0] == "")
		{
			getNewsFeed();
		}
			else{
			
			 $.ajax({
			 type: 'GET',
			 url: '/searchAllNewsFeedItemsByTag', 
			   dataType: 'json',
			beforeSend: function (xhr) {
					/* authorization header with token */
					xhr.setRequestHeader("authorization", localStorage.getItem('token'));
			},
			   data:query,
			 success: function(data){
		
				$(".post").remove();
				
				$.each(data , function(i, val) { 
				if(data[i].e != undefined)
					addEvent(data[i].e);
				else if (data[i].p != undefined)
					addPost(data[i].p);
				else 
					addVoting(data[i]);
			});
			
				console.log(JSON.stringify(data));
			 }
		 });
		}	
		
	}
	
	
	function getPostRating(id, clas){
		var result;
		 $.ajax({
		 type: 'GET',
		 url: '/getPostRating', 
		   dataType: 'json',
		   data:{
		   'id':  id
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function result(data){
			 //debugger;
			 if(data == null)
				 data = 0;
			 
				$(clas).stars({ 
				value: data,
				click: function(i) {
					checkIfUserRatedAndRateStatus(id, i);
					}
				});	
		 }
		 });
	}
	
	
	function getEventRating(id, clas){
		var result;
		 $.ajax({
		 type: 'GET',
		 url: '/getEventRating', 
		   dataType: 'json',
		   data:{
		   'id':  id
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function result(data){
			 //debugger;
			 if(data == null)
				 data = 0;
			 
				$(clas).stars({ 
				value: data,
				click: function(i) {
					checkIfUserRatedAndRateEvent(id, i);
					}
				});	
		 }
		 });
	}
	
	
	function getPollRating(id, clas){
		var result;
		 $.ajax({
		 type: 'GET',
		 url: '/getPollRating', 
		   dataType: 'json',
		   data:{
		   'id':  id
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function result(data){
			 //debugger;
			 if(data == null)
				 data = 0;
			 
				$(clas).stars({ 
				value: data,
				click: function(i) {
					checkIfUserRatedAndRatePoll(id, i);
					}
				});	
		 }
		 });
	}


	
	function getNewsFeed(rating){
		 $.ajax({
		 type: 'GET',
		 url: '/getAllUsersNewsFeedItems', 
		   dataType: 'json',
		   data:{
		   'username':  localStorage.getItem("Username"),
		   'rating': rating
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function(data){
			//alert(JSON.stringify(data));
	
			$(".post").remove();
			
			
			$.each(data , function(i, val) {
				
			clas = ".rating." + data[i]._id;			
				
			if(data[i].labels == undefined)
			{
				addVoting(data[i]);
				getPollRating(data[i]._id, clas);
			}
				
			else if(data[i].labels[0] == 'Event')
			{
				addEvent(data[i]);
				getEventRating(data[i]._id, clas);
			}
			else if (data[i].labels[0] == 'Post')
			{
				addPost(data[i]);
				getPostRating(data[i]._id, clas);
			}
		
			console.log(JSON.stringify(data));
		 });
		
		 }});
	}
	
function rateStatus(postId, rating)
{
	var rate = {};
	rate['rating'] = rating;
	rate['username'] = localStorage.getItem("Username");
	rate['id'] =  postId;
	
		$.ajax({
		type: 'GET',
		url: '/ratePost',
		dataType: 'json',
		data: rate,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
				
		},
		error:function(jqXHR, textStatus){
		}
	});	
}

function rateEvent(postId, rating)
{
	var rate = {};
	rate['rating'] = rating;
	rate['username'] = localStorage.getItem("Username");
	rate['id'] =  postId;
	
		$.ajax({
		type: 'GET',
		url: '/rateEvent',
		dataType: 'json',
		data: rate,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
				
		},
		error:function(jqXHR, textStatus){
		}
	});	
}

function ratePoll(postId, rating)
{
	var rate = {};
	rate['rating'] = rating;
	rate['username'] = localStorage.getItem("Username");
	rate['id'] =  postId;
	
		$.ajax({
		type: 'GET',
		url: '/ratePoll',
		dataType: 'json',
		data: rate,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
				
		},
		error:function(jqXHR, textStatus){
		}
	});	
}

function checkIfUserRatedAndRateStatus(postId, rating){

	$.ajax({
		type: 'GET',
		url: '/checkIfUserRatedPost',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			id:postId
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(!data){
				rateStatus(postId, rating);
			}else{
				alert('Već ste glasali!');
			}	
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}
function checkIfUserRatedAndRatePoll(postId, rating){

	$.ajax({
		type: 'GET',
		url: '/checkIfUserRatedPoll',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			id:postId
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(!data){
				ratePoll(postId, rating);
			}else{
				alert('Već ste glasali!');
			}	
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}	
function checkIfUserRatedAndRateEvent(postId, rating){

	$.ajax({
		type: 'GET',
		url: '/checkIfUserRatedEvent',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			id:postId
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(!data){
				rateEvent(postId, rating);
			}else{
				alert('Već ste glasali!');
			}	
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}		
	function getCourseFeed(courseName, rating){
		
		 $.ajax({
		 type: 'GET',
		 url: '/getAllCourseItems', 
		   dataType: 'json',
		   data:{
		   'name': courseName,
		   'rating': rating
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function(data){

			$(".post").remove();
			
			$.each(data , function(i, val) { 
			
						clas = ".rating." + data[i]._id;
						
						
			if(data[i].labels == undefined)
			{
				addVoting(data[i]);
				getPollRating(data[i]._id, clas);
			}
				
			else if(data[i].labels[0] == 'Event')
			{
				addEvent(data[i]);
				getEventRating(data[i]._id, clas);
			}
			else if (data[i].labels[0] == 'Post')
			{
				addPost(data[i]);
				getPostRating(data[i]._id, clas);
			}
					
		});
		
		 }
	 });
	}

	

	
	$( document ).ready(function() {
			
	$('#search-input').selectize({
      persist: false,
      createOnBlur: true,
      create: true
     });
	
		var course  = getParameterByName('course');
		/*if(course!=null){
			courseClicked(course);
		}else{
			var userEmail = localStorage.getItem("Username");
			
			getAllPosts(userEmail);
			getAllPolls(userEmail);
			getAllEvents(userEmail);
		}*/
		if(course!=null){
			courseClicked();
		}else{
			getNewsFeed(false);
		}
		
});




