
$( "#select_fuel_id" ).change( function() {
	var brand = document.getElementById("select_brand");
	var fuel = document.getElementById("select_fuel_id");
	var brand_id = brand.options[brand.selectedIndex];
	var fuel_id = fuel.options[fuel.selectedIndex];
	if (brand_id.value != "null" && fuel_id.value != "null") {
		get_graph(brand_id, fuel_id);
	} else {
		var message = (brand.selectedIndex == 0) ? "Please select a brand" : "Please select a fuel type";
		alert(message);
	}
});

$( "#select_brand" ).change( function() {
	var brand = document.getElementById("select_brand");
	var fuel = document.getElementById("select_fuel_id");
	var brand_id = brand.options[brand.selectedIndex];
	var fuel_id = fuel.options[fuel.selectedIndex];
	if (brand_id.value != "null" && fuel_id.value != "null") {
		get_graph(brand_id, fuel_id);
	}
});

function get_graph(brand_id, fuel_id) {
	$.ajax({
	method: 'GET',
	url: 'http://localhost/FP/API/graph_data_api.php?',
	data: {
		brand_id: escape(brand_id.value),
		fuel_type: escape(fuel_id.value)
	},
	dataType: 'json',
	success: function onSuccess(jsonReturn) {
		growDiv();
		var data = [];
		var regression = [];
		var labels = [];
		var title = "";
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
			title = "Brand: " + brand_id.innerHTML + " Fuel Type: " + fuel_id.innerHTML;					}

		draw_graph(title , data, labels, regression)
		
	},
	error: function onError(xhr) {
			console.log(xhr.responseText);
	}
	})
}

function growDiv() {
	var growDiv = document.getElementById('fuel_data');
	growDiv.style.maxHeight = "1000px";
	$('#content_wrapper').animate({
		     scrollTop: $( '#header_image' ).height()
		   }, 'slow');
}