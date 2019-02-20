function change(event) {
	if (event.id == "calculate") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() + 1
		   }, 'slow');
	} else if (event.id == "prices") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height()
		   }, 'slow');
	} else if (event.id == "data") {
		$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() 
		     + $( '#entry_fields2' ).height() + 2
		   }, 'slow');
	} else {
		$('#content_wrapper').animate({
		     scrollTop: 0
		   }, 'slow');
	}
}

function scrollEvent() {
	var el = document.getElementById('content_wrapper');
	var maxScroll = el.scrollHeight - el.clientHeight;
	var slide =  document.getElementById("slide_bar");
	if (el.scrollTop >= ($( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() 
		     + $( '#entry_fields2' ).height() + 10)) {
		if (el.scrollTop > ($( '#header_image' ).height() 
		     + $( '#entry_fields1' ).height() 
		     + $( '#entry_fields2' ).height())) {
			document.getElementById('slide_bar').style.width;
		} else {
			slide.style.marginLeft = (((el.scrollTop - $( '#header_image' ).height() 
			- $( '#entry_fields1' ).height() - $( '#entry_fields2' ).height())
			/ $( '#entry_fields3' ).height()) 
			* (getWidth('#data') - (getWidth("#data") 
			- $( '#slide_bar' ).width())/2)) 
			+ getWidth('#home') + getWidth('#prices') + getWidth('#calculate') 
			+ (getWidth("#data") - $( '#slide_bar' ).width())/2 + "px";
		}
		document.getElementById("home").className = "left_item";
		document.getElementById("data").className = "left_item active";
		document.getElementById("prices").className = "left_item";
		document.getElementById("calculate").className = "left_item";
	} else if (el.scrollTop >= ($( '#header_image' ).height() + $( '#entry_fields1' ).height())) {
		slide.style.marginLeft = (((el.scrollTop - $( '#header_image' ).height() 
			- $( '#entry_fields1' ).height())
			/ $( '#entry_fields2' ).height()) 
			* (getWidth('#calculate') - (getWidth("#calculate") 
			- $( '#slide_bar' ).width())/2)) 
			+ getWidth('#home') + getWidth('#prices') 
			+ (getWidth("#calculate") - $( '#slide_bar' ).width())/2 + "px";
		document.getElementById("home").className = "left_item";
		document.getElementById("data").className = "left_item";
		document.getElementById("prices").className = "left_item";
		document.getElementById("calculate").className = "left_item active";
	} else if (el.scrollTop >= $( '#header_image' ).height()) {
		slide.style.marginLeft = (((el.scrollTop - $( '#header_image' ).height())
			/ $( '#entry_fields1' ).height()) 
			* (getWidth('#prices') + (getWidth("#calculate") 
			- $( '#slide_bar' ).width())/2)) 
			+ getWidth('#home') + "px";
		document.getElementById("home").className = "left_item";
		document.getElementById("data").className = "left_item";
		document.getElementById("prices").className = "left_item active";
		document.getElementById("calculate").className = "left_item";
	} else {
		slide.style.marginLeft = ((el.scrollTop/$( '#header_image' ).height())  
			* (getWidth('#home') + 8) - 8) + "px";
		document.getElementById("home").className = "left_item active";
		document.getElementById("data").className = "left_item";
		document.getElementById("prices").className = "left_item";
		document.getElementById("calculate").className = "left_item";
	}

} 

function getWidth(id) {
	if ($( '#slide_bar' ).width() != 100) {
		return $( id ).width() + 18;
	}
	return $( id ).width() + 40;
}