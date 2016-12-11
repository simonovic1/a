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


function getAllPosts() {
	$.ajax({
		type: 'GET',
		url: '/getAllPosts',
		dataType: 'json',
		success: function(data){
		//alert(JSON.stringify(data));
		//alert(JSON.stringify(data));
			addPosts(data);
		}
	});
}

function getAllEvents() {
	$.ajax({
		type: 'GET',
		url: '/getAllEvents',
		dataType: 'json',
		success: function(data){
			addEvents(data);
		}
	});
}


function getAllPolls() {
	$.ajax({
		type: 'GET',
		url: '/getAllPolls',
		dataType: 'json',
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
		
	    var str = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><div class=\"panel-image\"><img src=\"" + post.picture + "\"/></div><h3 class=\"panel-title\">" + post.username + "</h3><div class=\"panel-date\">" + post.date + "</div></div></div><div class=\"panel-body\">" + post.text + "</div> <div class=\"panel-footer\"><span class=\"label label-primary\">Tag1</span>" + tagarray + "</div></div></div>");	

		$("#posts").append(str);	
	}
	
	
	
	function vote(poll_id, poll_name, username)
	{
		$.ajax({
		type: 'GET',
		  url: '/voteOption', // ime f-je sa servera
		  dataType: 'json', // sta vraca
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
	
		getAllElementsByCourse(courseName);
	}
	
	
	function getAllElementsByCourse(courseName)
	{
		$.ajax({
		type: 'GET',
		url: '/getAllCoursePosts', 
		  dataType: 'json',
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
		  data:{
		   'name': courseName
		  },
		success: function(data){
		//alert(JSON.stringify(data));
			addVotings(data);
		}
	});
	}
	
	$( document ).ready(function() {
		
		var course  = getParameterByName('course');
		if(course!=null){
			courseClicked(course);
		}else{
			getAllPosts();
			getAllPolls();
			getAllEvents();
		}
});




