var uName = "User";


function checkIfExists(){

	var name = document.getElementById("inputName");
	var pass = document.getElementById("inputPassword");

	console.log(name.value + " | " + pass.value);
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/checkLogin',
		dataType: 'json',
		data: { 'username': name.value, 'password': pass.value},
		success: function(data){
			if(data == true)
			{
				checkIfProfileExists(name,pass);
				//window.location = "NewsFeedPage.html";
			}
			else
				alert("Wrong username/password combination");
		}
	});
}

function CreateUserAccount(){

	var name = document.getElementById("inputName");
	var pass = document.getElementById("inputPassword");
	var indexNo = document.getElementById("indexNo");
	var firstName = document.getElementById("inputFirstName");
	var lastName = document.getElementById("inputLastName");
	var file = " ";

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/createUser',
		dataType: 'json',
		data: { 'username': name.value, 'password': pass.value, 'indexNo': indexNo.value, 'firstName' : firstName.value, 'lastName': lastName.value, 'file' : file},
		success: function(data){
			if(data == true)
			{
				window.location = "NewsFeedPage.html";
			}
			else
				alert("User is not created");
		}
	});
}

function checkIfProfileExists(name,pass){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/checkIfProfileExists',
		dataType: 'json',
		data: { 'username': name.value, 'password': pass.value},
		success: function(data){
			if(data == true)
			{
			    window.location = "NewsFeedPage.html";
			}
			else if(data == false)
			{
				 window.location = "signup.html";
			}
			else
				alert("Wrong username/password combination");
		}
	});
}






function CheckCookieSession(){
	/*var hasSession = document.cookie;
	var hasUserName = $.cookie("username");
	if(hasSession == "" && hasUserName != "")
	{
		window.location = "logIn.html";
		alert("Your session has expired");
	}*/
}

function searchKeyPress(e){
	if(e.keyCode == 13)
	{
		document.getElementById("LoginBtn").click();
	}
}
