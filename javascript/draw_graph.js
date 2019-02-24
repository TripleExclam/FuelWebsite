function draw_graph(title, graph_data, graph_labels, graph_regression) {
	var title_string = title;
	$( '#myChart' ).remove();
	$('#fuel_data').append('<canvas id="myChart" class="graph"><canvas>');
	var ctx = document.getElementById("myChart").getContext("2d");
	var myChart = new Chart(ctx, {
	    type: 'scatter',
	    data: {
	    	labels: graph_labels,
	        datasets: [{
	            data: graph_data,
	            backgroundColor: "blue",
		        borderColor: "lightblue"
	        }, 
	        {
	            data: graph_regression,
		        showLine: true,
		        pointBorderWidth: 0,
		        pointHitRadius: 0,
		        pointRadius: 0,
		        lineTension: 0,
		        fill: false,
		        borderWidth: 5,
		        borderColor: "pink",
	        }
	        ]
	    },
	    options: {
	    	maintainAspectRatio: true,
	    	responsive: true,
	    	onResize: function(chart, size) {
				if ($( '#content_wrapper' ).width() < 730) {
					chart.options.title.fontSize = 12;
					chart.update();
				} else {
					chart.options.title.fontSize = 20;
					chart.update();
				}
			},
	        scales: {
	            xAxes: [{
	            	type: 'time',
	            	time: {
	                    unit: 'day',
	                    displayFormats: {
	                    	day: 'MMM D YYYY'
	                    }
	                },
	            	ticks: {
	                	fontColor: 'white'
	                },
	                position: 'bottom',
	                scaleLabel: {
	                	display: true,
	                	labelString: "Date",
	                	fontColor: 'white'
	                },
	                gridLines: {
	                	color: 'white'
	                }
	            }],
	            yAxes: [{
	                ticks: {
	                	fontColor: 'white'
	                },
	                position: 'left',
	                scaleLabel: {
	                	display: true,
	                	labelString: "Price (cents)",
	                	fontColor: 'white'
	                },
	                gridLines: {
	                	color: 'white'
	                }
	            }]
	        },
	        title: {
	        	display: true,
	        	text: title_string,
	        	fontSize: 20,
	        	color: 'white'
	        },
	        legend: {
	        	display: false
	        }
	    }
	});
}


