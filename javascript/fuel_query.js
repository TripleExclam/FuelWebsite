/*
Rotates front and back elements. Processes the associative queries.
*/

var elem = document.getElementById('back');
var elem2 = document.getElementById('front');
elem.style.display = "block";
elem.style.WebkitBackfaceVisibility = "hidden";
elem2.style.WebkitBackfaceVisibility = "hidden";
elem.style.WebkitTransform = "perspective( 600px ) rotateY( 180deg )";
elem2.style.WebkitTransform = "perspective( 600px ) rotateY( 0deg )";

$( "#flip_back" ).click( function() {
	var elem = document.getElementById('back');
	elem.style.WebkitTransform = "perspective( 600px ) rotateY( -180deg )";
	var elem2 = document.getElementById('front');
	elem2.style.WebkitTransform = "perspective( 600px ) rotateY( 0deg )";
});

$( "#submit_query" ).click( function() {
	var location_pick = document.getElementById("pac-input");
	var year_pick = document.getElementById("select_year");
	var make_pick = document.getElementById("select_makes");
	var model_pick = document.getElementById("select_model");
	var trim_pick = document.getElementById("select_trim");
	var destination_pick = document.getElementById("pac-input2");
	if (location_pick.value == "") {
		alert("Please enter a starting location");
	} else if (make_pick.options[make_pick.selectedIndex].value != "--------") {
		if (year_pick.options[year_pick.selectedIndex].value == "--------") {
			alert("Please select a valid year of production");
		} else if (model_pick.options[model_pick.selectedIndex].value == "--------") {
			alert("Please select a valid production model");
		} else if (trim_pick.options[trim_pick.selectedIndex].value == "--------") {
			alert("Please select a valid vehicle trim");
		} else {
			loadFuel(location_pick.value, year_pick.value, make_pick.value
				, model_pick.value, trim_pick.value, destination_pick.value);
		}
	} else {
		loadFuel(location_pick.value, "", "", "", "", "");
	}

});

/*
Aquires the station data and displays it in the document.
*/
function loadFuel(location_pick, year_pick, make_pick, model_pick, trim_pick, destination_pick) {
	document.getElementById('submit_query').value = "loading...";
	$.ajax({
		method: 'GET',
		url: 'http://localhost/FP/API/math.php?',
		data: {
			current_loc: location_pick,
			year: escape(year_pick),
			make: escape(make_pick), 
			model: escape(model_pick),
			trim: escape(trim_pick),
			destination: destination_pick
		},
		dataType: 'json',
		success: function onSuccess(jsonReturn) {
			document.getElementById('back').style.height = $( '#front' ).height() + "px";
			var elem2 = document.getElementById('front');
			elem2.style.WebkitTransform = "perspective( 600px ) rotateY( 180deg )";
			var elem = document.getElementById('back');
			elem.style.WebkitTransform = "perspective( 600px ) rotateY( 0deg )";
			$("#fuel_results_data").empty();
			console.log(jsonReturn);
			document.getElementById('fuel_results').innerHTML = "Fuel Results:";
			document.getElementById("fuel_results_data").innerHTML += ("<tr class=fuel_station><th>Station</th><th>" + jsonReturn[0].fuel_type + " ($) </th><th>Distance (km) </th><th>Full Tank (~$) </th></tr>" );
			for (var i = 0; i < jsonReturn.length; i++) {
				document.getElementById("fuel_results_data").innerHTML += (
					"<tr class=fuel_station><td>" + jsonReturn[i].station_name +
					"</td><td>" + jsonReturn[i].fuel_price +
					"</td><td>" + jsonReturn[i].distance/1000 +
					"</td><td>" + jsonReturn[i].full_tank + 
					"</th></tr>" );
			}
			document.getElementById('submit_query').value = "Submit Query";
			
		},
		error: function onError(xhr) {
  			alert(xhr.responseText);
		}
	})
}