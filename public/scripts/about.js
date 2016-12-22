var reviewed;
function getCourseInfo(course) {
	$.ajax({
		type: 'GET',
		url: '/getCourseByName', // ime f-je sa servera
		dataType: 'json', // sta vraca
		data:{
			'name': course,
		},
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
	//	alert(JSON.stringify(data));
			addCourseInfo(data); // poziv moje f-je u js
		}
	});
}
function getAllReviews(course) {
	$.ajax({
		type: 'GET',
		url: '/getAllCourseReviews', // ime f-je sa servera
		dataType: 'json', // sta vraca
		data:{
			'name': course,
		},
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
		//alert(JSON.stringify(data));
			addReviews(data); // poziv moje f-je u js
		}
	});
}

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
	if(reviews.length==0){
		$("#about").append("<div>Trenutno nema recenzija kursa.</div>");	
	}
	$.each(reviews , function(i, val) { 
		addReview(reviews[i]);
	});	
}
function addReview(json)
{
	//subject name je hard kodirano

	var review = json.properties;
	var string = "<div class=\"review\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">" + review.creatorName + "</h3><div class=\"panel-date\"></div></div></div><div class=\"panel-body\">" + review.text + "</div> <div class=\"panel-footer\"><div class=\"container\"><span><div style=\"float:left color:#2C3E50\"><span id=" + json._id + "u" + ">" + review.upvote + "</span><a class=\"like\" style=\"margin-right:10px; cursor:pointer; color:#2C3E50\" onclick=\"checkIfUserVotedAndUpvote(this.id)\" id=" + json._id + "><i class=\"glyphicon glyphicon-thumbs-up\" style=\"margin-left:10px\" ></i>  Like    </a><span id=" + json._id + "d" + ">" + review.downvote + "</span><a class=\"dislike\" style=\"cursor:pointer; color:#2C3E50\" onclick=\"checkIfUserVotedAndDownvote(this.id)\" id=" + json._id + "><i class=\"glyphicon glyphicon-thumbs-down\"  style=\"margin-left:10px\"></i> Dislike </a></div></span></div></div></div></div>";
	$("#about").append(string);	
}
$('#clickedUpvote').click(function() {
    alert($(this).parent.val());
});


// upvote
function upvote(reviewId)
{
	var upvote = {};
	
	
	upvote['username'] = localStorage.getItem("Username");
	upvote['id'] =  reviewId;
	
		$.ajax({
		type: 'GET',
		url: '/upvoteReview',
		dataType: 'json',
		data: upvote,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
				getAllUpvotes(reviewId);
		},
		error:function(jqXHR, textStatus){
				alert("Creating review unsuccessful.");

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
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			$('#' + reviewId + 'u').html(data);
		}
	});
}
//downvote
function downvote(reviewId)
{
	var upvote = {};
	
	
	upvote['username'] = localStorage.getItem("Username");
	upvote['id'] =  reviewId;
	
		$.ajax({
		type: 'GET',
		url: '/downvoteReview',
		dataType: 'json',
		data: upvote,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){

				getAllDownvotes(reviewId);
			
		},
		error:function(jqXHR, textStatus){
				alert("Creating review unsuccessful.");
		}
	});

}
//get all downvotes
function getAllDownvotes(reviewId)
{
	var id = '#' + reviewId + '';
	$.ajax({
		type: 'GET',
		url: '/totalDownvotes', // ime f-je sa servera
		dataType: 'json', // sta vraca
		data:{
			'id': reviewId,
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			$('#' + reviewId + 'd').html(data);
			
		}
	});
}
	
function addNewReview(){

//if(!reviewed){
	var review = {};
	
	review['text'] =  $('#review-text').val();
	review['name'] = localStorage.getItem('Course');
	review['creatorName'] = localStorage.getItem('Ime') + " " + localStorage.getItem('Prezime') ;
	review['username'] = localStorage.getItem('Username');
	
	console.log(JSON.stringify(review));
	
		$.ajax({
		type: 'GET',
		url: '/createReview',
		dataType: 'json',
		data: review,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			
				//alert("Review created!");
				$('#review-modal').modal('hide');
				getAllReviews(localStorage.getItem("Course"));
			
		},
		error:function(jqXHR, textStatus){
				alert("Creating review unsuccessful.");
			
		}
	});
	
/*}else{
		alert('Već ste postavili recenziju!');
	}*/
	

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


function follow(){
	
		$.ajax({
		type: 'GET',
		url: '/userFollow',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			//alert('Follow');
			window.location.reload(true);

		},
		error:function(jqXHR, textStatus){
				alert("unsuccessful.");
			
		}
	});
	
	
}

function subscribe(){
	
	$.ajax({
		type: 'GET',
		url: '/userSubscribe',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			//alert('Subscribe');
			window.location.reload(true);
		},
		error:function(jqXHR, textStatus){
				alert("unsuccessful.");
			
		}
	});
}

function unfollow(){
	$.ajax({
		type: 'GET',
		url: '/userUnfollow',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			//alert('Unfollow');
			window.location.reload(true);
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}
function unsubscribe(){
	$.ajax({
		type: 'GET',
		url: '/userUnsubscribe',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
		success: function(data){
			//alert('Unsubscribe');
			window.location.reload(true);
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}

function isFollowing(){
	$.ajax({
		type: 'GET',
		url: '/IsFollowing',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(data){
				$('#follow').html('Unfollow');
				$('#follow').attr('onclick','unfollow()');
			}else{
				$('#follow').html('Follow');
				$('#follow').attr('onclick','follow()');

			}
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}

function isSubscribed(){
	$.ajax({
		type: 'GET',
		url: '/Subscribed',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(data){
				$('#subscribe').html('Unsubscribe');
				$('#subscribe').attr('onclick','unsubscribe()');
			}else{
				$('#subscribe').html('Subscribe');
				$('#subscribe').attr('onclick','subscribe()');

			}
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}
function checkIfUserVotedAndUpvote(reviewId){

	$.ajax({
		type: 'GET',
		url: '/checkIfUserVoted',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			id:reviewId
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(!data){
				upvote(reviewId);
			}else{
				alert('Već ste glasali!');
			}	
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}

function checkIfUserVotedAndDownvote(reviewId){

	$.ajax({
		type: 'GET',
		url: '/checkIfUserVoted',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			id:reviewId
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			if(!data){
				downvote(reviewId);
			}else{
				alert('Već ste glasali!');
			}
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}
	function checkIfUserReviewed(){
	$.ajax({
		type: 'GET',
		url: '/checkIfUserPostedReview',
		dataType: 'json',
		data: {
			username: localStorage.getItem('Username'),
			name: localStorage.getItem('Course')
		},
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
			reviewed = data;
		},
		error:function(jqXHR, textStatus){
				alert("Unsuccessful.");
			
		}
	});
}
$( document ).ready(function() {
	
	var course = getParameterByName('course');
	localStorage.setItem("Course", course);
	
	isFollowing();
	isSubscribed();
	checkIfUserReviewed();
	getCourseInfo(course);
	getAllReviews(course);

});

