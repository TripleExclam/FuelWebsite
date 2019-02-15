function prep_address($address) {
	$address.replace(" ", "+", $address);
	$address.replace(",", "", $address);
	return $address;
}


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
	var elem2 = document.getElementById('front');
	elem2.style.WebkitTransform = "perspective( 600px ) rotateY( 180deg )";
	var elem = document.getElementById('back');
	elem.style.WebkitTransform = "perspective( 600px ) rotateY( 0deg )";
	var location_pick = document.getElementById("pac-input");
	var year_pick = document.getElementById("select_year");
	var make_pick = document.getElementById("select_makes");
	var model_pick = document.getElementById("select_model");
	var trim_pick = document.getElementById("select_trim");
	var destination_pick = document.getElementById("pac-input2");
	if (location_pick.value == "") {
		alert("Please enter a starting location");
	} else if (make_pick.options[make_pick.selectedIndex].value == "------") {
		alert("Please select a valid vehicle make");
	} else if (year_pick.options[year_pick.selectedIndex].value == "------") {
		alert("Please select a valid year of production");
	} else if (model_pick.options[model_pick.selectedIndex].value == "------") {
		alert("Please select a valid production model");
	} else if (trim_pick.options[trim_pick.selectedIndex].value == "------") {
		alert("Please select a valid vehicle trim");
	} else {
	document.getElementById('fuel_results').innerHTML = "loading...";
	console.log(location_pick.value);
		$.ajax({
			method: 'GET',
			url: 'http://localhost/FP/API/math.php?',
			data: {
				current_loc: location_pick.value,
				year: escape(year_pick.options[year_pick.selectedIndex].value),
				make: escape(make_pick.options[make_pick.selectedIndex].value), 
				model: escape(model_pick.options[model_pick.selectedIndex].value),
				trim: escape(trim_pick.options[trim_pick.selectedIndex].value),
				destination: destination_pick.value
			},
			dataType: 'json',
			success: function onSuccess(jsonReturn) {
				$("#fuel_results_data").empty();
				console.log(jsonReturn);
				document.getElementById('fuel_results').innerHTML = "Fuel Results:";
				for (var i = 0; i < jsonReturn.length; i++) {
					var list = document.getElementById("fuel_results_data");
					/// jquerify the DOM object 'o' so we can use the html method
					var list_item = document.createElement('li');
					list_item.className = "fuel_station";
					list_item.appendChild(document.createTextNode(jsonReturn[i].station_name + " " + jsonReturn[i].full_tank + " " + jsonReturn[i].fuel_price + " " +jsonReturn[i].tank_capacity + " " + jsonReturn[i].distance));
					list.appendChild(list_item);
				}
				
			},
			error: function onError(xhr) {
	  			alert(xhr.responseText);
			}
		})
	}

});