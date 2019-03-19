<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title> AusFuel </title>
	<link rel="stylesheet" href="css/new_style.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
</head>
<body>
<div id="top_nav" class="top_nav">
	<div class="top_nav_elements">
		<a href="#" class="left_item active" id="home" onclick="change(this)" >HOME</a>
		<a href="#" class="left_item" id="prices" onclick="change(this)">PRICES</a>
		<a href="#" class="left_item" id="calculate" onclick="change(this)">CALCULATE</a>
		<a href="#" class="left_item" id="data" onclick="change(this)">DATA</a>
		<div id="slide_bar" class="slide_bar"></div>
	</div>
</div>

<div id="sidenav" class="side_nav">
	<div class="side_nav_elements">
		<h3>
			<a id="BrisFuel"> AusFUel </a>
		</h3>
		<hr>
		<div class="nav_div"> 
			<a href="#" class="nav_item" id="mycar"><i class="fas fa-car"></i> MY CAR</a> 
		</div>
		<div class="nav_div">
			<a href="#" class="nav_item" id="recent_trips"><i class="fas fa-car-side"></i> RECENT TRIPS</a> 
		</div>
		<div class="nav_div"> 
			<a href="#" class="nav_item"id="support"><i class="fas fa-file"></i> SUPPORT</a> 
		</div>

		<div class="bottom_div">
			Bottom
		</div>
	</div>
</div>

<div id="content_wrapper" class="content_wrapper" onscroll="scrollEvent()">
	<div id="header_image" class="header_image"> 
		<div id="header_text" class="header_text">
			<p> WELCOME TO AUSFUEL </p>
			<h1> HISTORICAL DATA, PRICE SEARCH AND PRICE MAP </h1>
		</div>
	</div>
	<div id="entry_fields1" class="data_entry">
		<div id="fuel_data" class="fuel_data">
			<h1> Fuel Data </h1>
			<div id="search_field" class="search_field">
				<div id="select_b" class="select_b">
					<h2>Station:</h2>
					<select id="select_brand" class="select_brand" type="text" placeholder="loading..."> 
						<option value="null"> ------ </option>	
						<option value=""> All Stations </option>
						<?php 
						include("connect.php");
						$sql = "SELECT DISTINCT b.* FROM brand_types b, price p, station s WHERE s.brand_id = b.brand_id AND s.id = p.station_id GROUP BY b.brand_id";
						$query = mysqli_query($con, $sql);

						while ($brand = mysqli_fetch_array($query)) {
							echo "<option value=".$brand['brand_id']."> ".$brand['brand_name']." </option>";
						}
						?>
					</select>
				</div>
				<div id="select_b" class="select_b">
					<h2>Fuel:</h2>
					<select id="select_fuel_id" type="text" placeholder="loading..."> 
						<option value="null"> ------ </option>
					</select>
				</div>
				<div id="select_b" class="select_b" style="display: none;">
					<h2>From:</h2>
					<select id="select_date_range_from" type="text" name="trim" placeholder="loading..."> 
						<option value="null"> ------ </option>
						<?php 
						include("connect.php");
						$sql = "SELECT MIN(date_updated) as minD, MAX(date_updated) as maxD FROM price";
						$query = mysqli_query($con, $sql);

						$date = mysqli_fetch_array($query);

						echo "<option value=".$date['minD']."> ".$date['minD']." </option>";
						echo "<option value=".$date['maxD']."> ".$date['maxD']." </option>";

						?>
					</select>
				</div>
				<div class="select_b" style="display: none;">
					<h2>To:</h2>
					<select id="select_date_range_to" type="text" name="trim" placeholder="loading..."> 
						<option value="null"> ------ </option>
						<?php 
						include("connect.php");
						$sql = "SELECT MIN(date_updated) as minD, MAX(date_updated) as maxD FROM price";
						$query = mysqli_query($con, $sql);

						$date = mysqli_fetch_array($query);
						echo "<option value=".$date['minD']."> ".$date['minD']." </option>";
						echo "<option value=".$date['maxD']."> ".$date['maxD']." </option>";
						?>
					</select>
				</div>
				<div class="keyword" style="display: none;">
					<input id="keyword_search" class="keyword_search" type="text" placeholder="keyword search" name="keywords" style="display: none;">
				</div>
			</div>
		</div>
	</div>
	<div id="entry_fields2" class="data_entry">
		<div id="back" class="back">
			<h1> Price Search </h1>
			<h2 id="fuel_results"></h2>
			<div id="loader" class="loader"></div> 
			<table id="fuel_results_data" class="fuel_stations">
				
				<!-- Content From Javascript. -->
			</table>
			<button id="flip_back"> Go Back </button>
			<img src="css/images/empty_fuel.png" alt="Give me some fuel">
		</div>
		<div id="front" class="front">
			<h1> Price Search </h1>
			<h2> Current Location </h2>
			<span> Address: </span>
			<div class="autocomplete">
				<input id="pac-input" class="controls" type="text" placeholder="Search Box" name="current_loc">
			</div>
			<span> &#x200B </span>
			<hr>
			<h2> Vehicle Details </h2>
			<span> Vehicle Make: </span>
			<div class="autocomplete">
		    	<select onmousedown="if(this.options.length>8){this.size=8;}"  onchange='this.size=0;' onblur="this.size=0;" id="select_makes" type="text" name="make" placeholder="loading..."> 
		    		<option>--------</option>
		    	</select>
		    </div>
		    <span> Year of production: </span>
		    <div class="autocomplete">
				<select onmousedown="if(this.options.length>8){this.size=8;}"  onchange='this.size=0;' onblur="this.size=0;" id="select_year" type="text" name="year" placeholder="loading..."> 
					<option>--------</option>
				</select>
		    </div>
		    <span> Production model: </span>
		    <div class="autocomplete">
				<select onmousedown="if(this.options.length>8){this.size=8;}"  onchange='this.size=0;' onblur="this.size=0;" id="select_model" type="text" name="model" placeholder="loading..."> 
					<option>--------</option>
				</select>
		    </div>
		    <span> Trim type: </span>
		    <div class="autocomplete">
				<select onmousedown="if(this.options.length>8){this.size=8;}"  onchange='this.size=0;' onblur="this.size=0;" id="select_trim" type="text" name="trim" placeholder="loading..."> 
					<option>--------</option>
				</select>
		    </div>
		    <span> &#x200B </span>
		    <hr>
		    <h2> Optional Destination </h2>
		    <span> Address </span>
		    <div class="autocomplete">
			    <input id="pac-input2" class="controls" type="text" placeholder="Search Box" name="destination">
			</div>
		    <button id="submit_query"> View Prices </button>
		</div>
	</div>
	<div id="entry_fields3" class="data_entry">
		<div id="map_view" class="map_view">
			<h1> Price Map </h1>
			<div id="map"></div>
		</div>
	</div>
</div>
<script type="text/javascript" src="javascript/draw_map.js"></script>
<script type="text/javascript" src="javascript/navbar_change.js"></script>
<script type="text/javascript" src="javascript/draw_graph.js"></script>
<script type="text/javascript" src="javascript/graph_query.js"></script>
<script type="text/javascript" src="javascript/fuel_query.js"></script>
<script type="text/javascript" src="javascript/address_search.js"></script>
<script type="text/javascript" src="javascript/car_query.js"></script>
<script type="text/javascript">
function initialize() {
  initAutocomplete();
  initMap();
}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyArHArOSEyLkGdrK5VJt7ByeeMPGxlryfI&libraries=places&callback=initialize" async defer>
</script>
</body>
</html>