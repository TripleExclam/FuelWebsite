function change(event) {
	document.getElementById("home").className = "left_item";
	document.getElementById("data").className = "left_item";
	document.getElementById("prices").className = "left_item";
	document.getElementById("calculate").className = "left_item";
	event.className = "left_item active";
	if (event.id == "calculate") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height() + $( '#entry_fields1' ).height()
		   }, 'slow');
	} else if (event.id == "prices") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height()
		   }, 'slow');
	} else if (event.id == "data") {
		// :(
	} else {
		$('#content_wrapper').animate({
		     scrollTop: 0
		   }, 'slow');
	}
}