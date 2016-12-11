var urlDomain = "localHost";

function getAllCourses(){
	$.ajax({
        type: "GET",
        url: '/getAllCourses',
        success:function(data){
			showAllCourses(data);
		}
      });
	  
	  var username = localStorage.getItem("Username");
	  $.ajax({
        type: "GET",
        url: '/getAllSubscribedCourses?username='+username,
        success:function(data){
			showMyCourses(data);
		}
      });
}
function showMyCourses(data){
	if(data=="undefined"||data.length!==0){
		for(i=0;i<data.length;i++)
		{
			var link = "/course-page?course=" + data[i].properties.name;
			$("#my-courses").append('<a href="'+link+'" class="list-group-item">'+data[i].properties.name+'</a>');     
		}
	}else{
		$("#my-courses").append('<a href="#" class="list-group-item">Ne pratite nijedan kurs.</a>');
	}
}
function showAllCourses(data){
	if(data=="undefined"||data.length!==0){
		for(i=0;i<data.length;i++)
		{
			var link = "/course-page?course=" + data[i].properties.name;
			$("#all-courses").append('<a href="'+link+'" class="list-group-item">'+data[i].properties.name+'</a>');
		}
	}else{
		$("#my-courses").append('<a href="#" class="list-group-item">No courses in database.</a>');
	}
}
$(document).ready(function(){
    getAllCourses();
});
