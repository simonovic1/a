var dropzoneProfileChange;

$(document).ready(function(){
	
	loadUserProfile();
	
	//file upload section
	 Dropzone.options.dropzoneProfileChange = {
		url: '/pictureUpload',
		headers: {
			'authorization': localStorage.getItem('token')
		},
		dictDefaultMessage: 'Change picture',
		autoProcessQueue: false,
		addRemoveLinks: 'dictRemoveFile',
		maxFilesize: '30', //MB
		init: function() {
		   dropzoneProfileChange = this;
		   this.on('complete', function(file) {
			   dropzoneProfileChange.removeFile(file);
		   });
		   //catch other events here...
		}
    };
});

//Postavlja ime, prezime, index i sliku u myProfile sekciji.
//Treba pozvati prilikom inicijalizacije newsFeed strane.
function loadUserProfile(){
	document.getElementById("profileNameSurname").innerHTML = localStorage.getItem("Ime") + " " + localStorage.getItem("Prezime");
	var index = localStorage.getItem("Index");
	//document.getElementById("profileIndex").innerHTML = index;
	
	var img = localStorage.getItem("imgUrl");

	var imgUrl = "users/pictures/" + img + ".jpg";
	var imgUrl2 = "users/pictures/" + img + ".png";
	var imgUrlNoExtension = "users/pictures/" + img;
	var imgUrl3 = "users/pictures/noProfile.jpg";
	if(imageExists(imgUrl))
		document.getElementById("profileImage").src = imgUrl;
	else if(imageExists(imgUrl2))
		document.getElementById("profileImage").src = imgUrl2;
	else if(imageExists(imgUrlNoExtension))
		document.getElementById("profileImage").src = imgUrlNoExtension; //in case img has already .png, .jpg
	else
		document.getElementById("profileImage").src = imgUrl3;
	
	//nabavi kurs na osnovu url-a
	window.location.href
	localStorage.setItem("currentCourse", decodeURIComponent(window.location.href.split('&')[0].split('=')[1]));
}

function changeProfilePicture(){
	var pic = dropzoneProfileChange.files[0].name;
	var username = localStorage.getItem("Username");
	
	dropzoneProfileChange.processQueue();
		
	$.ajax({
		type: 'GET',
		url: '/editUserProfilePicture',
		dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		data: { 'username': username, 'picture': pic},
		success: function(data){
			if(data == true) {
				alert("Changed profile picture");
				localStorage.setItem("imgUrl", pic);
				loadUserProfile();
			}
			else
				alert("Error changing profile picture");
		}
	});
	
}

//Proverava da li slika (ili bilo koji fajl) postoji na datom URL-uName
//Poziva se jer se ne zna u kom formatu su slike koje korisnici uploduju.
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function signOut(){
	localStorage.clear();
	window.location = "/#";
}
