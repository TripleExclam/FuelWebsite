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
		        borderColor: "lightblue",
		        fill: false,
		        lineTension: 0,
		        radius: 5
	        }, 
	        {
	            data: graph_regression,
		        showLine: true,
		        pointBorderWidth: 0,
		        pointHitRadius: 0,
		        pointRadius: 0,
		        lineTension: 0,
		        fill: false,
		        borderWidth: 10,
		        borderColor: "pink",
	        }
	        ]
	    },
	    options: {
	    	maintainAspectRatio: true,
	    	responsive: true,
	    	onResize: function(chart, size) {
				if ($( '#content_wrapper' ).width() < 730) {
					chart.data.datasets[0].pointRadius = 3;
					chart.data.datasets[1].borderWidth = 3;
					chart.options.scales.yAxes[0].ticks.stepSize = 10;
					chart.options.scales.xAxes[0].time.stepSize = 1;
					chart.update();
				} else {
					chart.data.datasets[0].pointRadius = 5;
					chart.data.datasets[1].borderWidth = 10;
					chart.options.scales.yAxes[0].ticks.stepSize = 5;
					chart.options.scales.xAxes[0].time.stepSize = 0.5;
					chart.update();
				}
			},
	        scales: {
	            xAxes: [{
	            	type: 'time',
	            	time: {
	                    unit: 'month'
	                },
	            	ticks: {
	                	fontColor: 'white'
	                },
	                position: 'bottom',
	                scaleLabel: {
	                	display: true,
	                	fontSize: 16,
	                	labelString: "Date",
	                	fontColor: 'white'
	                },
	                gridLines: {
	                	color: 'white'
	                }
	            }],
	            yAxes: [{
	                ticks: {
	                	stepSize: 5,
	                	fontColor: 'white'
	                },
	                position: 'left',
	                scaleLabel: {
	                	display: true,
	                	fontSize: 16,
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


