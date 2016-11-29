var data={
  "myCourses":[
    "RANIM","NSI","IntSys","VAR","SC","3Dpipe","OUP","IS"
  ],
  "allCourses":[
    "RANIM","NSI","IntSys","VAR","SC","3Dpipe","OUP","IS","IZ","WEBMIN","NWT","EMS","..."
  ]
}

var allCourses = ["RANIM","NSI","IntSys","VAR","SC","3Dpipe","OUP","IS"]
//Note: length of allCourses must be greater then myCourses.
function show_courses(data){
  var i;
  for(i=0;i<data.myCourses.length;i++)
  {
      $("#my-courses").append('<a href="#" class="list-group-item">'+data.myCourses[i]+'</a>');
      $("#all-courses").append('<a href="#" class="list-group-item">'+data.allCourses[i]+'</a>');
  }
  for(i;i<data.allCourses.length;i++)
  {
      $("#all-courses").append('<a href="#" class="list-group-item">'+data.allCourses[i]+'</a>');
  }
}

function showAllCourses(data){
	var i;
	//console.log(data.length);
	 for(i=0;i<data.length;i++)
  {
	  // console.log(data[i]);
	  // console.log(data[i].name);
      $("#all-courses").append('<a href="#" onclick="courseClicked(\'' + data[i].properties.name + '\');" class="list-group-item">'+data[i].properties.name+'</a>');
  }
}

function showMyCourses(data){
	 var i;
	 
	for(i=0;i<data.length;i++)
	{
	  
      $("#my-courses").append('<a href="#" onclick="courseClicked(\'' + data[i].properties.name + '\');" class="list-group-item">'+data[i].properties.name+'</a>');
   
	}
}
$(document).ready(function(){
    //show_courses(data);
	getAllCourses();
});


function getAllCourses() {
	$.ajax({
		type: 'GET',
		url: '/getAllCourses',
		dataType: 'json',
		success: function(data){
		alert(JSON.stringify(data));
			showAllCourses(data);
		}
	});
}

