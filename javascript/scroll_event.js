function scrollEvent() {
	var el = document.getElementById('content_wrapper');

/*	// get scroll position in px
	console.log(el.scrollLeft, el.scrollTop);

	// set scroll position in px
	el.scrollLeft = 500;
	el.scrollTop = 1000;

	var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    document.documentElement.scrollTop = document.body.scrollTop = 1000;
	document.documentElement.scrollLeft = document.body.scrollLeft = 500;*/

	if (el.scrollTop > el.style.height) {
		//USEFUL
	}
}