var myDropzone;

$(document).ready(function(){
		//file upload section
	 Dropzone.options.dropzoneForm = {
		url: '/uploadFiles',
		headers: {
			'subfolder': 'sistemiBaza',
			'authorization': localStorage.getItem('token')
		}, //TEMPLATE FOR OTHER UPLOADS
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
	
	//nabavi spisak fajlova.	
});

function beginUpload(){
	myDropzone.processQueue();
}