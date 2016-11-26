


function getAllPosts() {
	$.ajax({
		type: 'GET',
		url: '/getAllPosts',
		dataType: 'json',
		success: function(data){
		alert(JSON.stringify(data));
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
			console.log(data);
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
			console.log(data);
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

		$("#home").append(str);	
	}
	
	
	
	function vote(poll_id, poll_name, username)
	{
		//pozovi karolininu fju na serveru
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
			  debugger;
		   addVotings(data) 
		  }
		 });
	}
	
	
	function addVotings(polls)
	{
		$.each(polls , function(i, val) { 
			addVoting(polls[i]);
		});
		
		//console.log(polls);
	}
	
	function addVoting(voting){
		var progressList = voting.options;
		var tagList = voting.tags;
				
	
		var progressArray = "";		
		$.each(progressList , function(i, val) { 
		//tu gde je id ubaci progressList[i].id kad karolina ubaci, ubaci ga u vote() fju ustvari
			progressArray += "<div class=\"vote-item\"><div class=\"vote-name\">" + progressList[i]["name"]+"</div><div class=\"vote-progress\"><div class=\"progress progress-striped\"><div class=\"progress-bar progress-bar-info\" style=\"width:"+progressList[i]["votes"]+"%\"></div></div></div><div class=\"vote-percent\"><span>"+progressList[i]["votes"]+"</span></div><div class=\"vote-button\"><button onclick=\"vote(\'" + voting.id + "\', \'" + progressList[i].name + "\', \'" + voting.username + "\');\">+</button></div></div>";
		});
		
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
		});
		
		var poolStr = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\">	<div class=\"panel-image\"><img src=\""+ voting.image +"\"/></div><h3 class=\"panel-title\">"+ voting.text+"?</h3>	<div class=\"panel-date\">"+voting.date+"</div></div></div><div class=\"panel-body\">"+""+"</div><div class=\"voting\">" + progressArray + "</div><div class=\"panel-footer\">"+tagarray+"</div></div>");
		$("#home").append(poolStr);	
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
		
		var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3></div> </div> <div class=\"panel-body\"><div>Opis: " + "Opis" + "</div><div>Predmet: " + tagList[0] + "</div><div>Datum: "+ Event.date +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
		$("#home").append(eventStr);	
	}
	

	
	$( document ).ready(function() {
		getAllPosts();
		getAllPolls();
		getAllEvents();
});

