var urlDomain = "localHost";

function getAllCourses(){
	$.ajax({
        type: "GET",
        url: '/getAllCourses',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
        success:function(data){
			showAllCourses(data);
		}
      });
	  
	  var username = localStorage.getItem("Username");
	  $.ajax({
        type: "GET",
        url: '/getAllFollowedCourses?username='+username,
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
        success:function(data){
			showMyCourses(data);
		}
      });
}
function showMyCourses(data){
	if(data=="undefined"||data.length!==0){
		for(i=0;i<data.length;i++)
		{
			var link = "/course-page?course=" + data[i].properties.name + "&authorization=" + localStorage.getItem('token');
			$("#my-courses").append('<a href="'+link+'" class="list-group-item" onclick="setCurrentCourse(\''+ data[i].properties.name +'\')">'+data[i].properties.name+'</a>');     
		}
	}else{
		$("#my-courses").append('<a href="#" class="list-group-item">Ne pratite nijedan kurs.</a>');
	}
}
function showAllCourses(data){
	if(data=="undefined"||data.length!==0){
		for(i=0;i<data.length;i++)
		{
			var link = "/course-page?course=" + data[i].properties.name + "&authorization=" + localStorage.getItem('token');
			$("#all-courses").append('<a href="'+link+'" class="list-group-item" onclick="setCurrentCourse(\''+ data[i].properties.name +'\')">'+data[i].properties.name+'</a>');
		}
	}else{
		$("#my-courses").append('<a href="#" class="list-group-item">No courses in database.</a>');
	}
}

function setCurrentCourse(course){
	localStorage.setItem("currentCourse", course);
}

function addFileElement(item, currCourse, parent, i){
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.innerHTML = i + 1;
	var td2 = document.createElement("td");
	td2.style.overflow = "hidden";
	td2.style.maxWidth = "200px"; //MISIC
	
	var a = document.createElement("a");
	a.innerHTML = item;
	a.href="courses/" + currCourse + "/" + item;
	a.download="courses/" + currCourse + "/" + item;
	a.onclick = function(){
		//MISIC
		//LikeFile(item); --> Stavi onaj tvoj HTTP req, napravio sam ti f-ju u server, samo me mrzelo da stavljam headere (tokene).
		alert("Liked this");
	}
	
	
	var tdOpis = document.createElement("td");
	tdOpis.innerHTML = "Neka tamo deskripcija 123 123 123"; //MISIC
	var tdLajkovi = document.createElement("td");
	tdLajkovi.innerHTML = i + 10; //MISIC
	
	
	td2.appendChild(a);
	tr.appendChild(td);
	tr.appendChild(td2);
	tr.appendChild(tdOpis);
	tr.appendChild(tdLajkovi);
	parent.appendChild(tr);
}

$(document).ready(function(){
    getAllCourses();
	
	//ukoliko smo u kursu nekom, setujemo to, i popunjavamo fajlove....
	//MISIC:
	var docTable = document.getElementById("fileItems");
	var currCourse = localStorage.getItem("currentCourse");
	if(docTable){
		$.ajax({
		type: 'GET',
		url: '/getFilesForCourse',
		dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		data: { 'course': localStorage.getItem("currentCourse")},
		success: function(data){
			if(data) {
				for(var i = 0; i< data.length; i++){
					addFileElement(data[i], currCourse, docTable, i);
				}
			}
			else
				alert("Error occured while trying to fetch files for current course");
		}
	});
	}
});