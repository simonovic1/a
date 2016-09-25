var uName = "User";


function checkIfExists() {

	var name = document.getElementById("inputName").value;
	var pass = document.getElementById("inputPassword").value;

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/loginCheck',
		dataType: 'json',
		data: { 'username': name, 'password': pass},
		success: function(data){
			if(data == true) {
				checkIfProfileExists(name, pass);
			}
			else
				alert("Wrong username/password combination");
		}
	});
}

function CreateUserAccount() {

	var name = document.getElementById("inputName").value;
	var pass = document.getElementById("inputPassword").value;
	var indexNo = document.getElementById("indexNo").value;
	var firstName = document.getElementById("inputFirstName").value;
	var lastName = document.getElementById("inputLastName").value;
	var dropzone = document.getElementById("inputPicture");

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/createProfile',
		dataType: 'json',
		data: { 'username': name, 'password': pass, 'indexNumber': indexNo, 'firstName' : firstName, 'lastName': lastName, 'picture' : dropzone.files.file.name},
		success: function(data){
			if(data == true)
			{
				console.log("Sign up successfull");
				localStorage.setItem("Ime", firstName);
				localStorage.setItem("Prezime", lastName);
				localStorage.setItem("Index", indexNo);
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
		data: { 'username': name, 'password': pass},
		success: function(data){
			if(data == true)
			{
				//TODO 
				//Dodati logiku za stavljanje u localStorage ime,prezime i brIndexa.
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


/* user Profile logic */

//Postavlja ime, prezime, index i sliku u myProfile sekciji.
//Treba pozvati prilikom inicijalizacije newsFeed strane.
function loadUserProfile(){
	document.getElementById("profileNameSurname").innerHTML = localStorage.getItem("Ime") + " " + localStorage.getItem("Prezime");
	var index = localStorage.getItem("Index");
	document.getElementById("profileIndex").innerHTML = index;
	
	var imgUrl = "users/pictures/" + index + ".jpg";
	var imgUrl2 = "users/pictures/" + index + ".png";
	var imgUrl3 = "users/pictures/noProfile.jpg";
	if(imageExists(imgUrl))
		document.getElementById("profileImage").src = imgUrl;
	else if(imageExists(imgUrl2))
		document.getElementById("profileImage").src = imgUrl2;
	else
		document.getElementById("profileImage").src = imgUrl3;
	
}

//Proverava da li slika (ili bilo koji fajl) postoji na datom URL-uName
//Poziva se jer se ne zna u kom formatu su slike koje korisnici uploduju.
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

/* !!user Profile logic!! */
