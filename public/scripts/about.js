function getCourseInfo() {
	$.ajax({
		type: 'GET',
		url: '/getCourseByName', // ime f-je sa servera
		dataType: 'json', // sta vraca
		data:{
			'name': "Sistemi baza podataka",
		},
		success: function(data){
		alert(JSON.stringify(data));
			addCourseInfo(data); // poziv moje f-je u js
		}
	});
}
function getAllReviews() {
	$.ajax({
		type: 'GET',
		url: '/getAllCourseReviews', // ime f-je sa servera
		dataType: 'json', // sta vraca
		data:{
			'name': "Sistemi baza podataka",
		},
		success: function(data){
		alert(JSON.stringify(data));
			addReviews(data); // poziv moje f-je u js
		}
	});
}
////////////////////////////////////////////////////////////////// functions for implementation///////////////////////////////////////////////////////////////////////////////
function addCourseInfo(course)
{
		var course = course.properties;
		var lectureGroupTimeStart = course.lectureGroupTimeStart;
		//var lectureGroupTimeEnd = course.lectureGroupTimeEnd;
		var lectureGroupDay = course.lectureGroupDay;
		var lectureGroupClassroom = course.lectureGroupClassroom;
		
		var str;
	    //exercises-time
	    for(var i=0;i<lectureGroupClassroom.length;i++)
	    {
	    	$exerciseDay = mapDay(lectureGroupDay[i]);
	    	str = "<h5>" + $exerciseDay + " " + lectureGroupTimeStart[i] +  " (" +  lectureGroupClassroom[i] + ")</h5>";
	    	$("#exercises-time").append(str);
	    }
		//subject name
		var courseName = "<h3 >" + course.name +"</h1>";
		$("#subject-name").append(courseName);
		//class time
		$day = mapDay(course.lectureDay);
		var lectureDay = "<h5 style=\"margin-top:20px\">" + $day + " " + course.lectureTimeStart + "(" + course.lectureClassroom + ")</h5>";
		$("#class-time").append(lectureDay);
		//professor
		var professor = "<h5>" + course.professor + "</h5>";
		$("#professor").append(professor);
		//assistant
		var assistant = "<h5>" + course.assistant + "</h5>";
		$("#assistant").append(assistant);
		//enrolmentKey
		var enrolmentKey = "<h5 style=\"margin-top:20px\">" +course.enrolmentKey + "</h5>";
		$("#enrolmentKey").append(enrolmentKey);	
}
function mapDay(dayNumber)
{
	$dayName = "Ponedeljak";
	switch(dayNumber) {
    	case 2:
    		 $dayName = "Utorak";
    		 break;
    	case 3:
    		 $dayName = "Sreda";
    		 break;
        case 4:
    		 $dayName = "Cetvrtak";
    		 break;
    	case 5:
    		 $dayName = "Petak";
    		 break;
    }
    return $dayName;		
}

//getting all reviews
function addReviews(reviews)
{
	$.each(reviews , function(i, val) { 
		addReview(reviews[i]);
	});	
}
function addReview(json)
{
	//subject name je hard kodirano
	
	var review = json.properties;
	var string = "<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">" + "Sistemi baza podataka" + "</h3><div class=\"panel-date\"></div></div></div><div class=\"panel-body\">" + review.text + "</div> <div class=\"panel-footer\"><div class=\"container\"><span><div style=\"float:left color:#2C3E50\">" + review.upvote + "<a class=\"like\" style=\"margin-right:10px; color:#2C3E50\" onclick=\"upvote(this.id)\" id=" + json._id + "><i class=\"glyphicon glyphicon-thumbs-up\" style=\"margin-left:10px\" ></i>  Like    </a>" + review.downvote + "<a class=\"dislike\" style=\"color:#2C3E50\"><i class=\"glyphicon glyphicon-thumbs-down\"  style=\"margin-left:10px\"></i> Dislike </a></div></span></div></div></div></div>";
	$("#about").append(string);	
}
$('#clickedUpvote').click(function() {
    alert($(this).parent.val());
});
// upvote
function upvote(reviewId)
{
	var upvote = {};
	
	
	upvote['username'] = "djolej@elfak.rs";
	upvote['id'] =  reviewId;
	
		$.ajax({
		type: 'GET',
		url: '/upvoteReview',
		dataType: 'json',
		data: upvote,
		success: function(data){
			// treba da se pozove da vrati sve upvotove
			//alert("upvote created!")
				getAllUpvotes(reviewId);
			
		},
		error:function(jqXHR, textStatus){
				alert("Creating review unsuccessful.");
			alert(JSON.stringify(review));
		}
	});
	
}
//get all upvotes
function getAllUpvotes(reviewId)
{
	var id = '#' + reviewId + '';
	$.ajax({
		type: 'GET',
		url: '/totalUpvotes', // ime f-je sa servera
		dataType: 'json', // sta vraca
		data:{
			'id': reviewId,
		},
		success: function(data){
			
			//alert("Get all upvotes passed" + data);
			$('#' + reviewId + '').html(data);
			
		}
	});
}
	
function addNewReview(){

	var review = {};
	
	review['text'] =  $('#review-text').val();;
	review['username'] = "djolej@elfak.rs";
	review['name'] = "Sistemi baza podataka";
	
		$.ajax({
		type: 'GET',
		url: '/createReview',
		dataType: 'json',
		data: review,
		success: function(data){
			
				alert("Review created!");
				getAllReviews();
			
		},
		error:function(jqXHR, textStatus){
				alert("Creating review unsuccessful.");
			alert(JSON.stringify(review));
		}
	});
	
	
	

}

		
////////////////////////////////from newsfeed//////////////////
	/*function addPost(json){
		var post = json.properties;
		var tagList = post.tags;
					
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
		});
		
	    var str = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><div class=\"panel-image\"><img src=\"" + post.picture + "\"/></div><h3 class=\"panel-title\">" + post.username + "</h3><div class=\"panel-date\">" + post.date + "</div></div></div><div class=\"panel-body\">" + post.text + "</div> <div class=\"panel-footer\"><span class=\"label label-primary\">Tag1</span>" + tagarray + "</div></div></div>");	

		$("#about").append(str);	
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
				
	
		var progressArray = "";		
		$.each(progressList , function(i, val) { 
			progressArray += "<div class=\"vote-item\"><div class=\"vote-name\">" + progressList[i]["name"]+"</div><div class=\"vote-progress\"><div class=\"progress progress-striped\"><div class=\"progress-bar progress-bar-info\" style=\"width:"+progressList[i]["votes"]+"%\"></div></div></div><div class=\"vote-percent\"><span>"+progressList[i]["votes"]+"%</span></div><div class=\"vote-button\"><button>+</button></div></div>";
		});
		
		var tagarray = "";		
		$.each(tagList , function(i, val) { 
			tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
		});
		
		var poolStr = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\">	<div class=\"panel-image\"><img src=\""+ voting.image +"\"/></div><h3 class=\"panel-title\">"+ voting.username+"</h3>	<div class=\"panel-date\">"+voting.date+"</div></div></div><div class=\"panel-body\">"+voting.text+"</div><div class=\"voting\">" + progressArray + "</div><div class=\"panel-footer\">"+tagarray+"</div></div>");
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
		
		var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3></div> </div> <div class=\"panel-body\"><div>Naziv: " + tagList[0] + "</div><div>Datum: "+ Event.date +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
		$("#home").append(eventStr);	
	}*/
////////////////////////////////////////////////////////////////////////////////////////////////////	


	
$( document ).ready(function() {
	getCourseInfo();
	getAllReviews();
	//addNewReview();
});

