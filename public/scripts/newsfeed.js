var myDropzone;

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
	
	
	//file upload section
	 Dropzone.options.dropzoneForm = {
		url: '/uploadFiles',
		headers: {'subfolder': 'newsFeed'}, //TEMPLATE FOR OTHER UPLOADS
		dictDefaultMessage: 'Click here to transfer files',
		autoProcessQueue: false,
		addRemoveLinks: 'dictRemoveFile',
		maxFilesize: '30', //MB
		init: function() {
		   myDropzone = this;
		   this.on('complete', function(file) {
			   myDropzone.removeFile(file);
		   });
		   //catch other events here...
		}
    };
	
});

function beginUpload(){
	myDropzone.processQueue();
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
