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
//function show_courses(getAllCourses()){
//  var i;
//  for(i=0;i<data.m" class="list-group-item">'+data.myCourses[i]+'</a>');
//      $("#all-courses").append('<a href="#" class="list-group-item">'+data.allCourses[i]+'</a>');
//  }
//  for(i;i<data.allCourses.length;i++)
//  {yCourses.length;i++)
//  {
//      $("#my-courses").append('<a href="#
//      $("#all-courses").append('<a href="#" class="list-group-item">'+data.allCourses[i]+'</a>');
 // }
//}


$(document).ready(function(){
    show_courses(data);
});
