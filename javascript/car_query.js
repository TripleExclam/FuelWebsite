$.getJSON('https://www.carqueryapi.com/api/0.3/'+"?callback=?", {cmd:"getMakes", year:"2019"}, function(data) {

  	//The 'data' variable contains all response data.
  	var makes = data.Makes;
  	var makes_list = [];
  	for (var i = 0; i < makes.length; i++) {
  		makes_list.push(makes[i].make_display);
  		var o = new Option(makes_list[i], makes_list[i]);
		/// jquerify the DOM object 'o' so we can use the html method
		$(o).html(makes_list[i]);
		$("#select_makes").append(o);
  	}
});
$( "#select_makes" ).change( function() {
	var make_pick = document.getElementById("select_makes");
	$("#select_year").empty();
	$("#select_model").empty();
	$("#select_trim").empty();
	var o = new Option("loading...", "loading...");
	$(o).html("loading...");
	$("#select_year").append(o);
	$.getJSON('https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getYears&make=' + make_pick.options[make_pick.selectedIndex].value, function(data) {
		$("#select_year").empty();
		var o = new Option("--------", "--------");
		$(o).html("--------");
		$("#select_year").append(o);
	  	//The 'data' variable contains all response data.
	  	var makes = data.Years;
	  	var makes_list = [];
	  	for (var i = Number(makes.max_year); i > Number(makes.min_year); i--) {
	  		makes_list.push(String(i));
	  		var o = new Option(i, i);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(i);
			$("#select_year").append(o);
	  	}
   });
});

$( "#select_year" ).change( function() {
	var year_pick = document.getElementById("select_year");
	var make_pick = document.getElementById("select_makes");
	var model_pick = document.getElementById("select_model");
	$("#select_model").empty();
	$("#select_trim").empty();
	var o = new Option("loading...", "loading...");
	$(o).html("loading...");
	$("#select_model").append(o);
	$.getJSON('https://www.carqueryapi.com/api/0.3/'+"?callback=?", {cmd:"getModels", make: make_pick.options[make_pick.selectedIndex].value, year: year_pick.options[year_pick.selectedIndex].value}, function(data) {
		$("#select_model").empty();
		var o = new Option("--------", "--------");
		$(o).html("--------");
		$("#select_model").append(o);
	  	//The 'data' variable contains all response data.
	  	var makes = data.Models;
	  	var makes_list = [];
	  	for (var i = 0; i < makes.length; i++) {
	  		makes_list.push(makes[i].model_name);
	  		var o = new Option(makes_list[i], makes_list[i]);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(makes_list[i]);
			$("#select_model").append(o);
	  	}
		});
});

$( "#select_model" ).change( function() {
	$("#select_trim").empty();
	var year_pick = document.getElementById("select_year");
	var make_pick = document.getElementById("select_makes");
	var model_pick = document.getElementById("select_model");
	var o = new Option("loading...", "loading...");
	$(o).html("loading...");
	$("#select_trim").append(o);
	$.getJSON('https://www.carqueryapi.com/api/0.3/'+"?callback=?", {cmd:"getTrims", make: make_pick.options[make_pick.selectedIndex].value, year: year_pick.options[year_pick.selectedIndex].value, model: model_pick.options[model_pick.selectedIndex].value}, function(data) {
		$("#select_trim").empty();
		var o = new Option("--------", "--------");
		$(o).html("--------");
		$("#select_trim").append(o);
	  	//The 'data' variable contains all response data.
	  	var trims = data.Trims;
	  	var trim_list = [];
	  	for (var i = 0; i < trims.length; i++) {
	  		trim_list.push(trims[i].model_trim);
	  		var o = new Option(trim_list[i], trim_list[i]);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(trim_list[i]);
			$("#select_trim").append(o);
	  	}
		});
});