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
		
	    var str = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><div class=\"panel-image\"><img src=\"" + post.picture + "\"/></div><h3 class=\"panel-title\">" + post.username + "</h3><div class=\"panel-date\">" + post.date + "</div></div></div><div class=\"panel-body\">" + post.text + "</div> <div class=\"panel-footer\">" + tagarray + "</div></div></div>");	

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
		
		var poolStr = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\">	<div class=\"panel-image\"><img src=\""+ voting.image +"\"/></div><h3 class=\"panel-title\">"+ voting.text+"?</h3>	<div class=\"panel-date\">"+voting.date+"</div></div></div><div class=\"panel-body\">"+""+"</div><div class=\"voting " + voting._id + "\">" + progressArray + "</div><div class=\"panel-footer\">"+tagarray+"</div></div>");
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
		
		var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3></div> </div> <div class=\"panel-body\"><div>Opis: " + Event.text + "</div><div>Predmet: " + Event.courseName + "</div><div>Datum: "+ Event.date +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
		$("#posts").append(eventStr);	
	}
	
function courseClicked(courseName)
	{
		//getAllElementsByCourse(courseName);
		getCourseFeed(courseName);
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
	
	function PerformNewsfeedSearch()
	{
		
		 var selectize = $('#search-input')[0].selectize;
		 var tagsArray = selectize.getValue().split(',');
		
		var query={};
		query['tags'] = tagsArray;
		query['username'] = localStorage.getItem("Username");
		
		console.log(JSON.stringify(query));
		
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

	
	function getNewsFeed(){
		 $.ajax({
		 type: 'GET',
		 url: '/getAllUsersNewsFeedItems', 
		   dataType: 'json',
		   data:{
		   'username':  localStorage.getItem("Username")
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function(data){
			//alert(JSON.stringify(data));
	
			$(".post").remove();
			
			
			$.each(data , function(i, val) { 
			if(data[i].labels == undefined)
				addVoting(data[i]);
			else if(data[i].labels[0] == 'Event')
				addEvent(data[i]);
			else if (data[i].labels[0] == 'Post')
				addPost(data[i]);
		});
		
			console.log(JSON.stringify(data));
		 }
	 });
		
	}
	
	function getCourseFeed(courseName){
		
		 $.ajax({
		 type: 'GET',
		 url: '/getAllCourseItems', 
		   dataType: 'json',
		   data:{
		   'name': courseName
		  },
		  	beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		 success: function(data){

			$(".post").remove();
			
			$.each(data , function(i, val) { 
			if(data[i].labels == undefined)
				addVoting(data[i]);
			else if(data[i].labels[0] == 'Event')
				addEvent(data[i]);
			else if (data[i].labels[0] == 'Post')
				addPost(data[i]);
			 
				
		});
		
			console.log(JSON.stringify(data));
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
			courseClicked(course);
		}else{
			getNewsFeed();
		}
});




