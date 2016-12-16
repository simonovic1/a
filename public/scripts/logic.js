function checkIfExists() {

	var loader = document.getElementById("loader");
	loader.style.visibility = "inherit";
	
	var name = document.getElementById("inputName").value;
	var pass = document.getElementById("inputPassword").value;
	
	$.ajax({
		type: 'GET',
		url: '/loginCheck',
		dataType: 'json',
		data: { 'username': name, 'password': pass},
		success: function(data){
			loader.style.visibility = "hidden";
			if(data == true) {
				checkIfProfileExists(name, pass);
			}
			else
				alert("Wrong username/password combination");
		}
	});
}

function checkIfProfileExists(name,pass) {
	$.ajax({
		type: 'GET',
		url: '/checkIfProfileExists',
		dataType: 'json',
		/*headers: {
	        'Authorization':localStorage.getItem('token'),
	    },*/
		data: { 'username': name, 'password': pass},
		success: function(data, text, response){
			if(data == true)
			{
				//console.log(response.getResponseHeader('authorization'));
				
				// auth token
				localStorage.setItem("token", response.getResponseHeader('authorization'));

				SetUpLocalStorageSettings(name);
			}
			else if(data == false)
			{
				 window.location = "signUp";
			}
			else
				alert("Wrong username/password combination");
		}
	});
}

function SetUpLocalStorageSettings(username){
	$.ajax({
		type: 'GET',
		url: '/getUserByUsername',
		dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		data: { 'username': username },
		success: function(data){
			if(data){
				user_data = data["properties"];
				localStorage.setItem("Ime", user_data.firstName);
				localStorage.setItem("Prezime", user_data.lastName);
				localStorage.setItem("Index", user_data.indexNumber);
				localStorage.setItem("Username", username);
				localStorage.setItem("imgUrl", user_data.picture);

				/*var xhr = new XMLHttpRequest();
				xhr.open('GET', "/newsFeed");
				xhr.setRequestHeader("authorization", localStorage.getItem('token'));
				xhr.responseType = "blob";

				xhr.onload = function() {
					
					console.log(this.response);

					var url = URL.createObjectURL(this.response);
            		//window.location = url;

					document.open("text/html", "replace");
					document.write(this.response);
					document.close();
				}

				xhr.send();
				*/

				//window.location = "newsFeed";
			}
			else{
				alert("Couldn't load profile info.")
				window.location = "";
			}
		}
	});
}

function loginLoad(){
	//Add on Enter listener, for input pass & input username
	
	document.getElementById("inputName").addEventListener("keyup", function(event) {
		if (event.keyCode == 13) {
			document.getElementById("LoginBtn").click();
		}
	});
	
	document.getElementById("inputPassword").addEventListener("keyup", function(event) {
		if (event.keyCode == 13) {
			document.getElementById("LoginBtn").click();
		}
	});
}

function searchKeyPress(e) {
	if(e.keyCode == 13)
	{
		document.getElementById("LoginBtn").click();
	}
}
