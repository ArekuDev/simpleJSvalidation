function doModal(modalID, windowTitle, windowText, buttonText, buttonCallback, button2Text, button2Callback, footerText, noClick, noClose){ 
	// USAGE:
	// buttonCallback and button2Callback must be the name only of the function (no parameters) without qoutes.
		// ex:  doModal("modalWindow","title","text", "Btn Text", nameOfMyFunction, "Btn Two Text", nameOfAnotherFunction );
	// noClick disables the ability to click outside the modal or press esc to dismiss it
	// noClose prevents the modal from being closed at all, essentially disabling the page
	var version = "1.2",
	updated = "25 Jan 2021",
	note ="Latest source at /alexdev/js/";
	$('.modal-text-here').html(windowText);
	$('.modal-title').html(windowTitle);
	$('.modal-footerText').html(footerText);


	if(buttonText > "" && buttonText != null && buttonText != undefined){ 
		$('#modalButton').html(buttonText);
		$('#modalButton').click(function(){
			buttonCallback();
		});
	}
	else{
		if(!noClose){
			$('#modalButton').html("OK");
			$('#modalButton').click(function(){$("#"+modalID).modal('hide');});
		}
	}
	if(button2Text > "" && button2Text != null && button2Text != undefined){
		$('#modal2Button').removeClass("hidden");
		$('#modal2Button').html(button2Text);
		$('#modal2Button').click(function(){
		//	console.log("click 2");
			button2Callback();
		});
	}
	if(noClick){ 
		options = { backdrop: "static", keyboard: false }
	}
	else options = {};
	if(noClose){
		$("#modalButton").remove();
		$(".close").attr("data-dismiss", null);
		$(".close").on("click", function(){
			alert("Close this browser tab to continue.");
		});
	}
	$("#"+modalID).modal(options);
}