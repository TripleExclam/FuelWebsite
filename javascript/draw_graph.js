function draw_graph(title, graph_data, graph_labels, graph_regression) {
	document.getElementById("chart_container").style.display = "block";
	var title_string = title;
	$( '#myChart' ).remove();
	$('#chart_container').append('<canvas id="myChart" class="graph"><canvas>');
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
	    	maintainAspectRatio: false,
	    	onResize: function(chart, size) {
				if ($( '#content_wrapper' ).width() < 730) {
					chart.options.scales.xAxes[0].time.unitStepSize = 10;
				} else {
					chart.options.scales.xAxes[0].time.unitStepSize = 5;
				}
			},
	        scales: {
	            xAxes: [{
	            	type: 'time',
	            	time: {
	                    unit: 'day',
			    unitStepSize: 7,
	                    displayFormats: {
	                    	day: 'MMM D YYYY'
	                    }
	                },
	            	ticks: {
	                	fontColor: 'black'
	                },
	                position: 'bottom',
	                scaleLabel: {
	                	display: true,
	                	labelString: "Date",
	                	fontColor: 'black'
	                },
	                gridLines: {
	                	color: 'black'
	                }
	            }],
	            yAxes: [{
	                ticks: {
	                	fontColor: 'black'
	                },
	                position: 'left',
	                scaleLabel: {
	                	display: true,
	                	labelString: "Price (cents)",
	                	fontColor: 'black'
	                },
	                gridLines: {
	                	color: 'black'
	                }
	            }]
	        },
	        title: {
	        	display: true,
	        	text: title_string,
	        	fontSize: 20,
	        	color: 'black'
	        },
	        legend: {
	        	display: false
	        }
	    }
	});
}


