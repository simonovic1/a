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
				
				
				
    $('#poll-deadline').datetimepicker();
	   $('#event-deadline').datetimepicker();
	   
	   
            
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
                $('#entry' + num).slideUp('slow', function () {$(this).remove(); 
                // if only one element remains, disable the "remove" button
                    if (num -1 === 1)
                $('#btnDel').attr('disabled', true);
                // enable the "add" button
                $('#btnAdd').attr('disabled', false).prop('value', "add section");});
  
    });
 
    $('#btnDel').attr('disabled', true);
 
				
});

function addNewStatus(){

	var status = {};
	var selectize = $('#status-tags')[0].selectize;
	
	status['text'] = $('#status-text').val();
	status['tags'] = selectize.getValue();
	status['user-id'] = 21;
	status['course-id'] = 3;
	
	
	$('#status-modal').modal('hide');
	alert(JSON.stringify(status));

		
	

}

function addNewPoll(){

	var selectize = $('#poll-tags')[0].selectize;
	var numOptions = $('.clonedInput').length;
	var options = [];
	for (i = 1; i <= numOptions; i++) { 
		options.push( $('#ID' + i + "_option").val());
	}
	var poll={};
	poll.text = $("#poll-text").val();
	poll.deadline = $("#poll-deadline").val();
	poll.options = options;
	poll['user-id'] = 21;
	poll['course-id'] = 3;
	poll['tags'] = selectize.getValue();
	
	
	$('#poll-modal').modal('hide');
	alert(JSON.stringify(poll));
	
}

function addNewEvent(){

	var selectizeTags = $('#event-tags')[0].selectize;
	var selectizeEventType = $('#select-event')[0].selectize;
	Selectize.prototype.getText = function () {
    return this.getItem(this.getValue()).text();
};
	var event={};
	event.text = $("#event-text").val();
	event.deadline = $("#event-deadline").val();
	event['user-id'] = 21;
	event['type'] = selectizeEventType.getText();
	event['course-id'] = 3;
	event['tags'] = selectizeTags.getValue();
	
	$('#event-modal').modal('hide');
	alert(JSON.stringify(event));
	



}