/*
Scroll down the page based on the clicked header.

- Params:
	event: The event object describing the clicked link.
*/
function change(event) {
	if (event.id == "data") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() 
		     + $( '#entry_fields2' ).height() 
		     + 2
		   }, 'slow');
	} else if (event.id == "calculate") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() 
		     + 1
		   }, 'slow');
	} else if (event.id == "prices") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height()
		   }, 'slow');
	} else {
		$('#content_wrapper').animate({
		     scrollTop: 0
		   }, 'slow');
	}
}

/*
Controls the highlighting of active navigation elements and the sliding
underline.
*/
function scrollEvent() {
	var el = document.getElementById('content_wrapper');

	var maxScroll = el.scrollHeight - el.clientHeight;

	var slide =  document.getElementById("slide_bar");

	if (el.scrollTop >= ($( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() 
		     + $( '#entry_fields2' ).height() )) {

		//Data is active

		var scrollRatio = (el.scrollTop - $( '#header_image' ).height() - $( '#entry_fields1' ).height() - $( '#entry_fields2' ).height()) 
			/ $( '#entry_fields3' ).height();

		slide.style.marginLeft = (scrollRatio 
			* (getWidth('#data') / 2 - (getWidth("#calculate") 
			- $( '#slide_bar' ).width()) )) 
			+ getWidth('#home') 
			+ getWidth('#prices') 
			+ getWidth("#calculate") 
			+ "px";

		activateItem("data");

	} else if (el.scrollTop >= ($( '#header_image' ).height() + $( '#entry_fields1' ).height() )) {

		//Calculate is active

		var scrollRatio = (el.scrollTop - $( '#header_image' ).height() - $( '#entry_fields1' ).height()) / $( '#entry_fields2' ).height();

		slide.style.marginLeft = (scrollRatio 
			* (getWidth('#calculate') 
			- (getWidth("#calculate") 
			- $( '#slide_bar' ).width()) / 2)) 
			+ getWidth('#home') 
			+ getWidth('#prices') 
			+ (getWidth("#calculate") - $( '#slide_bar' ).width()) / 2 
			+ "px";

		if (scrollRatio > 0.5) {
			activateItem("data");
		} else {
			activateItem("calculate");
		}

	} else if (el.scrollTop >= $( '#header_image' ).height()) {

		//Prices is active

		var scrollRatio = (el.scrollTop - $( '#header_image' ).height()) / $( '#entry_fields1' ).height();

		slide.style.marginLeft = ((scrollRatio) 
			* (getWidth('#prices') 
			+ (getWidth("#calculate") 
			- $( '#slide_bar' ).width()) / 2)) 
			+ getWidth('#home') 
			+ "px";

		if (scrollRatio > 0.5) {
			activateItem("calculate");
		} else {
			activateItem("prices");
		}

	} else {

		//Home is active

		var scrollRatio = el.scrollTop / $( '#header_image' ).height();

		slide.style.marginLeft = ((scrollRatio) * (getWidth('#home') + 8) - 8) 
			+ "px";

		if (scrollRatio > 0.5) {
			activateItem("prices");
		} else {
			activateItem("home");
		}

	}

} 

/*
Ativate the passed header

params:
	-item (String): the id of the element to activate.
*/
function activateItem(item) {
	document.getElementById("home").className = "left_item";
	document.getElementById("data").className = "left_item";
	document.getElementById("prices").className = "left_item";
	document.getElementById("calculate").className = "left_item";
	document.getElementById(item).className = "left_item active";
}

/*
	Returns the width of a navbar element, applying the padding.
*/
function getWidth(id) {
	//Changes to padding need to be updated here.
	if ($( '#slide_bar' ).width() != 100) {
		return $( id ).width() + 18;
	}
	return $( id ).width() + 40;
}