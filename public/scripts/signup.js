var myDropzone;

$(document).ready(function(){
	
	//file upload section
	 Dropzone.options.dropzonePicture = {
		url: '/pictureUpload',
		headers: {
			'authorization': localStorage.getItem('token')
		},
		dictDefaultMessage: 'Upload picture',
		addRemoveLinks: 'dictRemoveFile',
		maxFilesize: '30', //MB
		autoProcessQueue: false,
		init: function() {
		   myDropzone = this;
		   this.on('complete', function(file) {
			   myDropzone.removeFile(file);
		   });
		   //catch other events here...
		}
    };

});

function CreateUserAccount() {

	var name = document.getElementById("inputName").value;
	var pass = document.getElementById("inputPassword").value;
	var indexNo = document.getElementById("indexNo").value;
	var firstName = document.getElementById("inputFirstName").value;
	var lastName = document.getElementById("inputLastName").value;
	//var dropzone = document.getElementById("inputPicture");
	var imgUrl = myDropzone.files[0].name;
	myDropzone.processQueue();
	
	

	$.ajax({
		type: 'GET',
		url: '/createProfile',
		dataType: 'json',
		data: { 'username': name, 'password': pass, 'indexNumber': indexNo, 'firstName' : firstName, 'lastName': lastName, 'picture' : imgUrl},
		success: function(data, text, response){
			if(data == true)
			{
				console.log("Sign up successfull");

				// auth token
				localStorage.setItem("token", response.getResponseHeader('authorization'));

				localStorage.setItem("Ime", firstName);
				localStorage.setItem("Prezime", lastName);
				localStorage.setItem("Index", indexNo);
				localStorage.setItem("Username", name);
				localStorage.setItem("imgUrl", imgUrl);
				window.location = "newsFeed?authorization=" + localStorage.getItem('token');
			}
			else
				alert("User is not created");
		}
	});
}