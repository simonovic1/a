var urlDomain = "localHost";

function getAllCourses(){
	$.ajax({
        type: "GET",
        url: "http://"+urlDomain+":3000/getAllCourses",
        success:function(data){
			showAllCourses(data);
		}
      });
	  
	  var username = localStorage.getItem("Username");
	  $.ajax({
        type: "GET",
        url: "http://"+urlDomain+":3000/getAllSubscribedCourses?username="+username,
        success:function(data){
			showMyCourses(data);
		}
      });
}
function showMyCourses(data){
	if(data=="undefined"||data.length!==0){
		for(i=0;i<data.length;i++)
		{
			$("#my-courses").append('<a href="#" class="list-group-item">'+data[i].properties.name+'</a>');     
		}
	}else{
		$("#my-courses").append('<a href="#" class="list-group-item">No subscribed course.</a>');
	}
}
function showAllCourses(data){
	if(data=="undefined"||data.length!==0){
		for(i=0;i<data.length;i++)
		{
			$("#all-courses").append('<a href="#" class="list-group-item">'+data[i].properties.name+'</a>');
		}
	}else{
		$("#my-courses").append('<a href="#" class="list-group-item">No courses in database.</a>');
	}
}
$(document).ready(function(){
    getAllCourses();
});
