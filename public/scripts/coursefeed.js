// var json = {"image": "images/bla.png", 
	// "username": "Petra Zivanovic", 
	// "date": "29.9.2016.", 
	// "text":"neki tekst", 
	// "tags": [{"tag-name":"tag1"}, {"tag-name":"tag2"}]};
	
	
	
var jsons = {"posts": [{"image": "images/bla.png", 
	"username": "Petra Zivanovic", 
	"date": "29.9.2016.", 
	"text":"neki tekst", 
	"tags": [{"tag-name":"tag1"}, {"tag-name":"tag2"}]}, {"image": "images/bla.png", 
	"username": "Pavle Zivanovic", 
	"date": "3.10.2016.", 
	"text":"njdasdjasodjt", 
    "tags": [{"tag-name":"tag3"}, {"tag-name":"tag4"}]}]};
	
	var jsonsPool = {"votings": [{"image": "images/bla.png", 
	"username": "Petra Zivanovic", 
	"date": "29.9.2016.", 
	"text":"neki tekst", 
	"progress": [{"progress-name":"sreda", "progress-value":"20%", "progress-percent":"20%"}, {"progress-name":"cetvrtak", "progress-value":"30%", "progress-percent":"30%"}],
	"tags": [{"tag-name":"tag1"}, {"tag-name":"tag2"}]}, {"image": "images/bla.png", 
	"username": "Pavle Zivanovic", 
	"date": "3.10.2016.", 
	"text":"sdsadsfsfsfsft", 
	"progress": [{"progress-name":"petak", "progress-value":"50%", "progress-percent":"50%"}, {"progress-name":"subota", "progress-value":"70%", "progress-percent":"70%"}],
	"tags": [{"tag-name":"tag24"}, {"tag-name":"tag12"}]}]};
	
	
	var jsonsEvent = {"events" : [{"image": "images/bla.png", 
	"title": "Kolokvijum 1", 
	"date": "29.9.2016.", 
	"coureName":"neki tekst", 
	"tags": [{"tag-name":"tag1"}, {"tag-name":"tag2"}]}, {"image": "images/bla.png", 
	"title": "Kolokvijum 3", 
	"date": "21.3.2016.", 
	"coureName":"nadfmedkfepfkepfkef", 
	"tags": [{"tag-name":"tagic"}, {"tag-name":"tag3434"}]}]};
	
	
	
	
	function addPosts()
	{
		var posts = jsons.posts;
		$.each(posts , function(i, val) { 
			addPost(posts[i]);
		});
	}
	
	function addPost(json){
		var tagList = json.tags;
					
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-info\">"+  tagList[i]["tag-name"] +"</span>";
		});
		
	    var str = $("<div class=\"post\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"heading-table\"><div class=\"panel-image\"><img src=\"" + json.image + "\"/></div><h3 class=\"panel-title\">" + json.username + "</h3><div class=\"panel-date\">" + json.date + "</div></div></div><div class=\"panel-body\">" + json.text + "</div> <div class=\"panel-footer\"><span class=\"label label-info\">Tag1</span>" + tagarray + "</div></div></div>");	

		$(".container").append(str);	
	}
	
	
	
	
	function addVotings()
	{
		var votings = jsonsPool.votings;
		$.each(votings , function(i, val) { 
			addPost(votings[i]);
		});
	}
	
	function addVoting(voting){
		var progressList = voting.progress;
		var tagList = voting.tags;
				
	
		var progressArray = "";		
		$.each(progressList , function(i, val) { 
			progressArray += "<div class=\"vote-item\"><div class=\"vote-name\">" + progressList[i]["progress-name"]+"</div><div class=\"vote-progress\"><div class=\"progress progress-striped\"><div class=\"progress-bar progress-bar-info\" style=\"width:"+progressList[i]["progress-value"]+"\"></div></div></div><div class=\"vote-percent\"><span>"+progressList[i]["progress-percent"]+"</span></div><div class=\"vote-button\"><button>+</button></div></div>";
		});
		
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-info\">"+  tagList[i]["tag-name"] +"</span>";
		});
		
		var poolStr = $("<div class=\"post\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"heading-table\">	<div class=\"panel-image\"><img src=\""+ voting.image +"\"/></div><h3 class=\"panel-title\">"+ voting.username+"</h3>	<div class=\"panel-date\">"+voting.date+"</div></div></div><div class=\"panel-body\">"+voting.text+"</div><div class=\"voting\">" + progressArray + "</div><div class=\"panel-footer\">"+tagarray+"</div></div>");
		$(".container").append(poolStr);	
	}
	
	
	
	
	
	function addEvents()
	{
		var events = jsonsEvent.events;
		$.each(events , function(i, val) { 
			addEvent(events[i]);
		});
	}
	
	function addEvent(Event){
		var tagList = Event.tags;
					
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-info\">"+  tagList[i]["tag-name"] +"</span>";
		});
		
		var eventStr = $("<div class=\"post\"><div class=\"panel panel-info\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3></div> </div> <div class=\"panel-body\"><div>Naziv: " + Event.courseName+ "</div><div>Datum: "+ Event.date +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
		$(".container").append(eventStr);	
	}
	
