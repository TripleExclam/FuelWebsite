function change(event) {
	document.getElementById("home").className = "left_item";
	document.getElementById("data").className = "left_item";
	document.getElementById("prices").className = "left_item";
	document.getElementById("calculate").className = "left_item";
	event.className = "left_item active";
	if (event.id == "calculate") {
		document.getElementById("content_wrapper").style.backgroundPosition = "top right";
		document.getElementById("entry_fields1").style.display = "none";
		document.getElementById("entry_fields2").style.display = "block";
	} else if (event.id == "prices") {
		document.getElementById("content_wrapper").style.backgroundPosition = "top left";
		document.getElementById("entry_fields1").style.display = "block";
		document.getElementById("entry_fields2").style.display = "none";
	} else if (event.id == "data") {
		document.getElementById("content_wrapper").style.backgroundPosition = "bottom left";
		document.getElementById("entry_fields1").style.display = "none";
		document.getElementById("entry_fields2").style.display = "none";
	} else {
		document.getElementById("content_wrapper").style.backgroundPosition = "bottom right";
		document.getElementById("entry_fields1").style.display = "none";
		document.getElementById("entry_fields2").style.display = "none";
	}
}