var myDropzone;
var newName;
var newDesc;
var tags;

$(document).ready(function(){

	var names=["Filter1", "Filter2", "Filter3", "Filter4", "Filter5"]; //samo dodamo novo ime i dodaje se tag
	createTags(names);

	vph = $(window).height();
	$('#side').css({'height': vph + 'px'});
	
	drawPanels(1, "Panel", "Sadrzaj lalalalalalal", "home-panel");
	drawPanels(2, "Panel", "Sadrzaj djoiaw", "home-panel");
	drawPanels(3, "Panel", "Sadrzaj lalalaawdwfdwflalalal", "home-panel");
	drawPanels(4, "Panel", "Sadrzaj lalalaawdwfdwflalalal", "home-panel");
	drawPanels(5, "Panel", "Sadrzaj lalalaawdwfdwflalalal", "home-panel");
	drawPanels(1, "Panel", "Sadrzaj lalalaawdwfdwflalalal", "home-panel");

	drawPanels(3, "Panel", "Sadrzaj lalalalalalal", "rightSideBar");
	drawPanels(4, "Panel", "Sadrzaj djoiaw", "rightSideBar");
	drawPanels(5, "Panel", "Sadrzaj lalalaawdwfdwflalalal", "rightSideBar");
	
	getNotifications();
	
	//file upload section
	 Dropzone.options.dropzoneForm = {
		url: '/uploadFiles',
		headers: {
			'subfolder': localStorage.getItem('currentCourse'),
			'authorization': localStorage.getItem('token')
		}, //TEMPLATE FOR OTHER UPLOADS
		dictDefaultMessage: 'Click here to transfer files',
		autoProcessQueue: false,
		addRemoveLinks: 'dictRemoveFile',
		maxFilesize: '30', //MB
		init: function() {
		   myDropzone = this;
		   this.on('complete', function(file) {
			   //Takodje odmah dodajemo u spisak foldera...
			   var docTable = document.getElementById("fileItems");
			   addFileElement(newName, localStorage.getItem('currentCourse'), docTable, docTable.children.length);
			   
			   myDropzone.removeFile(file);
			   
			   
		   });
		   //catch other events here...
		},
		sending: function(file, xhr, formData){
			var today = new Date();
			var tagsTranslated = [];
			tagsTranslated.push(tags);
			
			var splitedName = file.name.split('.');
			var extension = splitedName[splitedName.length - 1];
			newName = newName + "." + extension;
			
			formData.append("fileName", newName);
			formData.append("description", newDesc);
			formData.append("username", localStorage.getItem("Username"));
			formData.append("date", new Date(today.getFullYear() , today.getMonth(), today.getDate()));
			formData.append("time", today.getHours() + ":" + today.getMinutes());
			formData.append("tags", tagsTranslated);
			
			formData.append("indexNo", localStorage.getItem("Index"));
			formData.append("courseName", localStorage.getItem('currentCourse'));
		},
		renameFilename: function (filename) {
			var splitedName = filename.split('.');
			var extension = splitedName[splitedName.length - 1];
			//newName = newName + "." + extension;
			return newName
		},
		complete: function(){
			
			//dodamo status
			addFilePost();
			
			//brisemo sve predhodne vrednosti
			newName =  "";
			document.getElementById("noviNaziv").value = "";
			newDesc = "";
			document.getElementById("deskripcija").value = "";
			tags = "";
			var $select = $('#tags-file').selectize();
			var control = $select[0].selectize;
			control.clear();
			
		}
    };
	
});

function beginUpload(){
	newName = document.getElementById("noviNaziv").value;
	newDesc = document.getElementById("deskripcija").value;
	tags = document.getElementById("tags-file").value;
	var table = document.getElementById("fileItems").innerHTML;
	if(table.includes(">"+newName)){
		alert("Ime je vec zauzeto");
	}
	else{		
		if(newName == "" || newDesc == "" || tags == ""){
			alert("Molimo popunite naziv, deskripciju i tagove!")
		}
		else		
			myDropzone.processQueue();
	}
}

function createTags(names)
{
	var taglist = $(".tag-list");

	for(var i=0; i<names.length; i++)
	{
		var div1 = document.createElement('div');
		$(div1).attr("class", "col-lg-2");

		var div2 = document.createElement('div');
		$(div2).attr("class", "input-group tags");


		var input = document.createElement('input');
		$(input).attr("type", "checkbox");

		$(div2).append(input);
		$(div2).append(names[i]);
	    $(div2).appendTo(div1);
		$(taglist).append(div1);
		
	}
}

function drawPanels(type, title, content, panelId)
{
		var div1 = document.createElement('div');
		switch(type)
		{
			case 1:
			$(div1).attr("class", "panel panel-primary");
			break;
			case 2:
			$(div1).attr("class", "panel panel-success");
			break;
			case 3:
			$(div1).attr("class", "panel panel-info");
			break;
			case 4:
			$(div1).attr("class", "panel panel-warning");
			break;
			case 5:
			$(div1).attr("class", "panel panel-danger");
			break;
		}
	

		var div2 = document.createElement('div');
		$(div2).attr("class", "panel-heading");


		var h3 = document.createElement('h3');
		$(h3).attr("class", "panel-title");
		$(h3).text(title);

		var div3 = document.createElement('div');
		$(div3).attr("class", "panel-body");
		$(div3).append(content);

		$(div1).append(div2);
		$(div2).append(h3);
	    $(div1).append(div3);
		$("#" + panelId).append(div1);
}

function getNotifications()
{
    var notification_pane = document.getElementsByClassName("notifications_list");
	var data = [];
	var type = ["danger", "warning", "info", "success"];

	data = [
		{
				"_id": 78,
				"labels": [
					"Notification"
				],
				"properties": {
					"eventID": 77,
					"courseName": "Sistemi baza podataka",
					"type": 1,
					"text": " opis neki",
					"name": "Prvi kolokvijum test"
				}
			},
			{
				"_id": 85,
				"labels": [
					"Notification"
				],
				"properties": {
					"eventID": 60,
					"courseName": "Sistemi baza podataka",
					"type": 0,
					"text": " opis neki",
					"name": "Prvi kolokvijum test"
				}
			}
		];
	
	$.ajax({
       type: 'GET',
       url: '/getAllNotificationsForUser',
       dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
	   data: {
		    'username': localStorage.getItem("Username") 
		},
       success: function (data) {
           if (data) {
				for (var i = 0; i < data.length; i++)
				{
					var div = document.createElement('div');
					$(div).attr("class", "alert alert-dismissible alert-" + type[data[i]["properties"].type]);
					$(div).attr("style", "margin-bottom: 10px;padding-bottom: 5px;padding-top: 5px;");
					var button = document.createElement('button');
					$(button).attr("type", "button");
					$(button).attr("class", "close");
					$(button).attr("data-dismiss", "alert");
					button.innerHTML = "&times;";
					//$(button).attr("onclick", "removeNotification(" + data[i]["_id"] 
					appendOnClick($(button),data[i]);
					$(div).append(button);
					div.innerHTML
						+= "<strong>" + data[i]["properties"].courseName + "</strong>" + ": "
						+ "<a class='not-content' href='#' data-postid='" + data[i]["properties"].eventID + "'>" + data[i]["properties"].text + "</a><br>"
						+ "<h6 align='right'> Datum: " + "<a class='alert-link'>" + data[i]["properties"].date + "</a></h6>";
					$(notification_pane).append(div);

					$('.not-content').unbind('click');
					$('.not-content').on('click', div, function() {
						getSinglePost($(this).data('postid'));
					});
				}
			}
		}
    });
}

function getSinglePost(postId) {
	var data = {
        "_id": 464,
        "labels": [
            "Event"
        ],
        "properties": {
            "courseName": "Algoritmi i programiranje",
            "type": "1",
            "eventTime": "11:51",
            "eventDate": "24.12.2016.",
            "title": "Kolokvijum",
            "time": "11:51",
            "date": "22.12.2016.",
            "text": "dasdsa",
            "tags": [
                "algoritmi i programiranje",
                "tag"
            ],
            "picture": "aca.jpg",
            "username": "Stefan Simonovic"
        }
    };

	//ajax to get post, in success show post in modal
	$('#singlePostModalBody').empty();

	if(data.labels == undefined)
		addVotingModal(data);
	else if(data.labels[0] == 'Event')
		addEventModal(data);
	else if (data.labels[0] == 'Post')
		addPostModal(data);

	$('#singlePostModal').modal('show');
}

function addVotingModal(voting){
	var progressList = voting.options;
	var tagList = voting.tags;
			
	var userEmail = localStorage.getItem("Username");

	var progressArray = "";		
	$.each(progressList , function(i, val) { 
		progressArray += "<div id=\"" + voting._id + "\" class=\"vote-item\"><div class=\"vote-name\">" + progressList[i]["name"]+"</div><div class=\"vote-progress\"><div class=\"progress progress-striped\"><div class=\"progress-bar progress-bar-info\" style=\"width:"+progressList[i]["votes"]+"%\"></div></div></div><div class=\"vote-percent\"><span>"+progressList[i]["votes"]+"</span></div><div class=\"vote-button\"><button onclick=\"vote(\'" + voting._id + "\', \'" + progressList[i].name + "\', \'" + userEmail + "\');\">+</button></div></div>";
	});
	
	var tagarray = "";		
	$.each(tagList , function(i, val) { 
		tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
	});
	
	var poolStr = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ voting.text+"</h3>	<div class=\"panel-date\">"+voting.date+"</div></div></div><div class=\"panel-body\">"+"Rok za glasanje: <b>"+voting.deadline +"</b></div><div class=\"voting " + voting._id + "\">" + progressArray + "</div><div class=\"panel-footer\">"+tagarray+"</div></div>");
	$("#singlePostModalBody").append(poolStr);	
}

function addEventModal(ev){
	var Event = ev.properties;
	var tagList = Event.tags;
				
	var tagarray = "";		
	$.each(tagList , function(i, val) { 
		tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
	});
	
	// var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3></div> </div> <div class=\"panel-body\"><div>Naziv: " + Event.courseName+ "</div><div>Datum: "+ Event.date +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
	
	var eventStr = $("<div class=\"post\"><div class=\"panel panel-primary\"> <div class=\"panel-heading\"><div class=\"heading-table\"><h3 class=\"panel-title\">"+ Event.title +"</h3><div class=\"panel-date\">" + Event.date + "</div></div> </div> <div class=\"panel-body\"><div>Datum: <b>" + Event.eventDate + " " + Event.eventTime  + "</b></div><div>Opis: "+ Event.text +"</div> </div> <div class=\"panel-footer\">" + tagarray + "</div> </div> </div>");
	$("#singlePostModalBody").append(eventStr);	
}

function addPost(json){
	var post = json.properties;
	var tagList = post.tags;
				
	var tagarray = "";		
		
	$.each(tagList , function(i, val) { 
	tagarray += "<span class=\"label label-primary\">"+  tagList[i] +"</span>";
	});
	
    var str = $("<div class=\"post\"><div class=\"panel panel-primary\"><div class=\"panel-heading\"><div class=\"heading-table\"><div class=\"panel-image\"><img src=\"" + post.picture + "\"/></div><h3 class=\"panel-title\">" + post.username + "</h3><div class=\"panel-date\">" + post.date + "</div></div></div><div class=\"panel-body\">" + post.text + "</div> <div class=\"panel-footer\">" + tagarray + "</div></div></div>");	

	$("#singlePostModalBody").append(str);	
}

function appendOnClick(elem, data){
	elem.attr("onclick", "removeNotification(" + data["_id"] +")");
}

function removeNotification(id)
{
	$.ajax({
       type: 'GET',
       url: '/deleteNotification',
       dataType: 'json',
		beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
	   data: {
		    'id': id 
		},
       success: function (data) {
           if (data) {
				//alert("deleted!");
           }
       }
    });
}

function addFilePost(){
	var status = {};
	var selectize = $('#tags-file')[0].selectize;
	var downloadStr = "courses/"+localStorage.getItem("Course")+"/"+ newName;

	var tagsArray = selectize.getValue().split(',');
	status['text'] = "Novi fajl: <a href=\""+ downloadStr + "\" download=\""+ downloadStr + "\">"+ newName+"</a> <br/> " + newDesc;
	
	status['tags'] = tagsArray;
	status['tags'].unshift(localStorage.getItem("Course").toLowerCase());
	status['date'] = moment().format('DD.M.YYYY.');
	status['time'] = new moment().format('HH:mm');
	
	status['username'] = localStorage.getItem("Ime") + " " + localStorage.getItem("Prezime");
	status['courseName'] = localStorage.getItem("Course");
	status['indexNo'] = localStorage.getItem("Index");
	status['picture'] = localStorage.getItem("imgUrl");
	
	$.ajax({
		type: 'GET',
		url: '/createPost',
		dataType: 'json',
		data: status,
			beforeSend: function (xhr) {
                /* authorization header with token */
                xhr.setRequestHeader("authorization", localStorage.getItem('token'));
		},
		success: function(data){
				$('#status-modal').modal('hide');
				window.location.reload(true);
		},
		error:function(jqXHR, textStatus){
				alert("Creating post unsuccessful.");
		}
	});
}