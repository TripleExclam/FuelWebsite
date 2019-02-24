// Redraws the graph if possible when the fuel is changed.
$( "#select_fuel_id" ).change( function() {
	var brand = document.getElementById("select_brand");
	var fuel = document.getElementById("select_fuel_id");
	var brand_id = brand.options[brand.selectedIndex];
	var fuel_id = fuel.options[fuel.selectedIndex];
	var start = document.getElementById("select_date_range_from");
	var end = document.getElementById("select_date_range_to");
	var start_date = start.options[start.selectedIndex];
	var end_date = end.options[end.selectedIndex];
	var station = document.getElementById("keyword_search").innerHTML;
	if (brand_id.value != "null" && fuel_id.value != "null") {
		get_graph(brand_id.value, fuel_id.value, start_date.value, 
			end_date.value, station.value);
	}
});
// Redraws the graph if possible when the brand is changed. Updates fuel types
// based on the selected station
$( "#select_brand" ).change( function() {
	var brand = document.getElementById("select_brand");
	var fuel = document.getElementById("select_fuel_id");
	var brand_id = brand.options[brand.selectedIndex];
	var fuel_id = fuel.options[fuel.selectedIndex];
	var start = document.getElementById("select_date_range_from");
	var end = document.getElementById("select_date_range_to");
	var start_date = start.options[start.selectedIndex];
	var end_date = end.options[end.selectedIndex];
	var station = document.getElementById("keyword_search").innerHTML;
	if (brand.options[brand.selectedIndex].value != "null") {
		$.ajax({
		method: 'GET',
		url: 'http://localhost/FP/api/station_fuel_type_api.php?',
		data: {
			brand: escape(brand.options[brand.selectedIndex].value),
			fuel: escape(fuel.options[fuel.selectedIndex].value)
		},
		dataType: 'json',
		success: function onSuccess(jsonReturn) {

			$("#select_fuel_id").empty();

			var o = new Option("null", "null");
			$(o).html(" ------ ");
			$("#select_fuel_id").append(o);

			for (var i = 0; i < jsonReturn.data.length; i++) {
				var o = new Option(jsonReturn.data[i].id, jsonReturn.data[i].id);
				$(o).html(jsonReturn.data[i].name);
				$("#select_fuel_id").append(o);
			}

			if (brand_id.value != "null") {
				if (jsonReturn.fuel) {
					$("#select_fuel_id").val(jsonReturn.fuel); 
					get_graph(brand_id.value, jsonReturn.fuel, start_date.value, 
						end_date.value, station.value);
				} 

				if (fuel_id.value != "null" ) {
					get_graph(brand_id.value, fuel_id.value, start_date.value, 
						end_date.value, station.value);
				}
			} 
		},
		error: function onError(xhr) {
			console.log(xhr.responseText);
		}

		})
	}
		
});
/*
Query's the database and calls draw_graph.js with the required data.
*/
function get_graph(brand_id, fuel_id, start_date, end_date, station) {
	$.ajax({
	method: 'GET',
	url: 'http://localhost/FP/API/graph_data_api.php?',
	data: {
		brand_id: escape(brand_id),
		fuel_type: escape(fuel_id),
		start_date: escape(start_date),
		end_date: escape(end_date),
		station: escape(station)
	},
	dataType: 'json',
	success: function onSuccess(jsonReturn) {
		growDiv();
		var data = [];
		var regression = [];
		var labels = [];
		for (var i = 0; i < jsonReturn.length; i++) {
			var data_point = {
                x: new Date(jsonReturn[i].date_updated),
                y: jsonReturn[i].price
            };
            var regression_point = {
            	x: new Date(jsonReturn[i].date_updated),
                y: jsonReturn[i].regression_price
            }
            labels.push(jsonReturn[i].date_updated);
			data.push(data_point);
			regression.push(regression_point);					
		}
		var brand = document.getElementById("select_brand");
		var fuel = document.getElementById("select_fuel_id");
		var brand_id = brand.options[brand.selectedIndex];
		var fuel_id = fuel.options[fuel.selectedIndex];
		var title = "Price of" + brand_id.innerHTML + ""
		+ fuel_id.innerHTML + " versus time";
		draw_graph(title, data, labels, regression)
		
	},
	error: function onError(xhr) {
			console.log(xhr.responseText);
	}
	})
}

function growDiv() {
	var growDiv = document.getElementById('fuel_data');
	growDiv.style.maxHeight = "2000px";
	$('#content_wrapper').animate({
		scrollTop: $( '#header_image' ).height()
	}, 'slow');
}
