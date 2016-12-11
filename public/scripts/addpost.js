$(function () {	
var events = [
						{id: 1, type: 'Ispit'},
						{id: 2, type: 'Kolokvijum'},
						{id: 3, type: 'Termin nastave'}
					];
	$('#event-tags').selectize({
					persist: false,
					createOnBlur: true,
					create: true
				});
				$('#status-tags').selectize({
					persist: false,
					createOnBlur: true,
					create: true
				});
				$('#poll-tags').selectize({
					persist: false,
					createOnBlur: true,
					create: true
				});
				$('#select-event').selectize({
					create:true,
					valueField: 'id',
					labelField: 'type',
					options: events
				});
				
				
				
    $('#poll-deadline').datetimepicker({ dateFormat: "MM.DD.YYYY" });
	$('#event-deadline').datetimepicker({ dateFormat: "MM.DD.YYYY" });
	   
	   
            
    $('#btnAdd').click(function () {
        var num     = $('.clonedInput').length, // how many "duplicatable" input fields we currently have
            newNum  = new Number(num + 1),      // the numeric ID of the new input field being added
            newElem = $('#entry' + num).clone().attr('id', 'entry' + newNum).fadeIn('slow'); // create the new element via clone(), and manipulate it's ID using newNum value
    // manipulate the name/id values of the input inside the new element
       
        // First name - text
     
        newElem.find('.input_answeroption').attr('id', 'ID' + newNum + '_option').attr('name', 'answer' + newNum + '_option').val('');
 
    // insert the new element after the last "duplicatable" input field
        $('#entry' + num).after(newElem);
        $('#ID' + newNum + '_title').focus();
 
    // enable the "remove" button
        $('#btnDel').attr('disabled', false);
 
    // right now you can only add 5 sections. change '5' below to the max number of times the form can be duplicated
        if (newNum == 10)
        $('#btnAdd').attr('disabled', true).prop('value', "You've reached the limit");
    });
 
    $('#btnDel').click(function () {
    // confirmation
       
                var num = $('.clonedInput').length;
                // how many "duplicatable" input fields we currently have
				if(num>1)
                $('#entry' + num).slideUp('slow', function () {$(this).remove(); 
                // if only one element remains, disable the "remove" button
                   /* if (num -1 === 1)
                $('#btnDel').attr('disabled', true);
                // enable the "add" button
                $('#btnAdd').attr('disabled', false).prop('value', "add section");*/
				
				});
  
    });
 
    $('#btnDel').attr('disabled', true);
 
				
});

function addNewStatus(){

	var status = {};
	var selectize = $('#status-tags')[0].selectize;

	var tagsArray = selectize.getValue().split(',');
	status['text'] = $('#status-text').val();
	status['tags'] = tagsArray;

	status['date'] = moment().format('DD.M.YYYY.');
	status['time'] = new moment().format('HH:mm');
	
	status['username'] = localStorage.getItem("Username");
	status['courseName'] = localStorage.getItem("Course");
	status['indexNo'] = localStorage.getItem("Index");
	status['picture'] = localStorage.getItem("imgUrl");
	
		$.ajax({
		type: 'GET',
		url: '/createPost',
		dataType: 'json',
		data: status,
		success: function(data){
			
				//alert("Status kreiran!");
				$('#status-modal').modal('hide');
				window.location.reload(true);
		},
		error:function(jqXHR, textStatus){
				alert("Creating post unsuccessful.");
			//alert(JSON.stringify(status));
		}
	});
		
	

}

function addNewPoll(){

	var selectize = $('#poll-tags')[0].selectize;
	var numOptions = $('.clonedInput').length;
	var options = [];
	for (i = 1; i <= numOptions; i++) { 
		options.push( $('#ID' + i + "_option").val());
	}
	var poll={};
	poll['text'] = $("#poll-text").val();
	poll['deadline'] = moment($("#poll-deadline").val()).format('DD.M.YYYY.HH:mm');
	poll['date'] = moment().format('DD.M.YYYY.');
	poll['time'] = new moment().format('HH:mm');
	poll['options'] = options;

	poll['tags'] =  selectize.getValue().split(',');
	
	
	poll['username'] = localStorage.getItem("Username");
	poll['courseName'] = localStorage.getItem("Course");
	poll['indexNo'] = localStorage.getItem("Index");
	poll['picture'] = localStorage.getItem("imgUrl");
	
	$('#poll-modal').modal('hide');
	alert(JSON.stringify(poll));

	

		$.ajax({
		type: 'GET',
		url: '/createPoll',
		dataType: 'json',
		data: poll,
		success: function(data){
			
				//alert("Poll created!");
				$('#poll-modal').modal('hide');
					window.location.reload(true);
		},
		error:function(jqXHR, textStatus){
				alert("Creating post unsuccessful.");
			//alert(JSON.stringify(poll));
		}
	});
	
}

function addNewEvent(){

	var selectizeTags = $('#event-tags')[0].selectize;
	var selectizeEventType = $('#select-event')[0].selectize;
	Selectize.prototype.getText = function () {
    return this.getItem(this.getValue()).text();
};
	var event={};
	event['text'] = $("#event-text").val();
	event['type'] = 'urgent';
	
	event['title'] = selectizeEventType.getText();

	event['tags'] = selectizeTags.getValue().split(',');;
	
	event['date'] = moment().format('DD.M.YYYY.');
	event['time'] = new moment().format('HH:mm');
	event['eventDate'] = moment($("#event-deadline").val()).format('DD.M.YYYY.');
	event['eventTime'] = moment($("#event-deadline").val()).format('HH:mm');
	
	event['username'] = localStorage.getItem("Username");
	event['courseName'] = localStorage.getItem("Course");
	event['indexNo'] = localStorage.getItem("Index");
	event['picture'] = localStorage.getItem("imgUrl");
	
	$('#event-modal').modal('hide');
	

		$.ajax({
		type: 'GET',
		url: '/createEvent',
		dataType: 'json',
		data: event,
		success: function(data){
			
				//alert("Event created!");
				$('#event-modal').modal('hide');
					window.location.reload(true);
		},
		error:function(jqXHR, textStatus){
				alert("Creating post unsuccessful.");
			//alert(JSON.stringify(event));
		}
	});


}