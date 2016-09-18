var uName = "User";


function checkIfExists() {

	var name = document.getElementById("inputName");
	var pass = document.getElementById("inputPassword");

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/checkLogin',
		dataType: 'json',
		data: { 'username': name.value, 'password': pass.value},
		success: function(data){
			if(data == true) {
				checkIfProfileExists(name,pass);
			}
			else
				alert("Wrong username/password combination");
		}
	});
}

function CreateUserAccount() {

	var name = document.getElementById("inputName");
	var pass = document.getElementById("inputPassword");
	var indexNo = document.getElementById("indexNo");
	var firstName = document.getElementById("inputFirstName");
	var lastName = document.getElementById("inputLastName");
	var dropzone = document.getElementById("inputPicture");

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/createProfile',
		dataType: 'json',
		data: { 'username': name.value, 'password': pass.value, 'indexNumber': indexNo.value, 'firstName' : firstName.value, 'lastName': lastName.value, 'picture' : dropzone.files.file.name},
		success: function(data){
			if(data == true)
			{
				console.log("Going to newsFeed");
				window.location = "newsFeed";
			}
			else
				alert("User is not created");
		}
	});
}

function checkIfProfileExists(name,pass) {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/checkIfProfileExists',
		dataType: 'json',
		data: { 'username': name.value, 'password': pass.value},
		success: function(data){
			if(data == true)
			{
			    window.location = "newsFeed";
			}
			else if(data == false)
			{
				 window.location = "signup";
			}
			else
				alert("Wrong username/password combination");
		}
	});
}






function CheckCookieSession() {
	/*var hasSession = document.cookie;
	var hasUserName = $.cookie("username");
	if(hasSession == "" && hasUserName != "")
	{
		window.location = "login.html";
		alert("Your session has expired");
	}*/
}

function searchKeyPress(e) {
	if(e.keyCode == 13)
	{
		document.getElementById("LoginBtn").click();
	}
}
