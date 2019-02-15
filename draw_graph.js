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
	    	maintainAspectRatio: false,
	    	responsive: false,
	        scales: {
	            xAxes: [{
	            	type: 'time',
	            	time: {
	                    unit: 'day'
	                },
	            	ticks: {
	                	fontColor: 'black'
	                },
	                position: 'bottom',
	                scaleLabel: {
	                	display: true,
	                	fontSize: 20,
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
	                	fontSize: 20,
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
	        	fontSize: 32
	        },
	        legend: {
	        	display: false
	        }
	    }
	});
}