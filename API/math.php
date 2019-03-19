<?php 
include("car.php");
include("distance.php");
include("connect.php");

$year = $_GET['year'];
$make = $_GET['make'];
$model = $_GET['model'];
$trim = $_GET['trim'];

if ($make == "--------" || $make == "") {
	$car = new car_query("2005", "Mini", "Cooper", "S"); //Default car.
} else {
	$car = new car_query($year, $make, $model, $trim); 
}
$ch = curl_init();
$location = curl_escape($ch, $_GET['current_loc']);

$optional_stop = false;

if (isset($_GET['destination']) && $_GET['destination'] != "") {
	$optional_stop = curl_escape($ch, $_GET['destination']);
	$location = $location . $optional_stop;
	$dist = new distance_query($location, $optional_stop);
} else {
	$dist = new distance_query($location);
}
curl_close($ch);

// Give users ability to select fuel type eventually.
$fuel_type = $car->get_fuel_type();
$tank_capacity = $car->get_tank_capacity();
$consumption = $car->get_economy();

// Some vehicles lack this data.
if ($consumption == 0) {
	$consumption = 8;
}

$cost = array();
$current_date = date('Y-m-d', strtotime('- 7 days'));

$sql = "SELECT * FROM station s, distance d, price p, fuel_types t WHERE d.location LIKE '".$location."' AND p.fuel_id='".$fuel_type."' AND p.date_updated >= ALL (SELECT date_updated FROM price p2 WHERE p2.fuel_id = p.fuel_id AND p2.station_id = p.station_id) AND p.station_id = d.station_id AND s.id = p.station_id AND t.fuel_id = p.fuel_id GROUP BY s.id";
$query = mysqli_query($con, $sql);

if (!$query) {
	echo("Error description: " . mysqli_error($con));
}

function compare($a, $b) {
	if ($a['full_tank'] == $b['full_tank']) {
		return 0;
	}
	return ($a['full_tank'] < $b['full_tank'] ? -1 : 1);
}

$i = 0;
while ($station = mysqli_fetch_array($query)) {
	if ($i == 10) {
		break;
	}
	$cost[$i]['station_name'] = $station['name'];
	$cost[$i]['full_tank'] = $station['price'] / 1000 
	* ($tank_capacity + $consumption * 2 * $station['distance']/100000); 
	$cost[$i]['full_tank'] = number_format(
		(float)$cost[$i]['full_tank'], 2, '.', '');
	$cost[$i]['normal_cost'] = $station['price'] / 1000 * $tank_capacity;
	$cost[$i]['fuel_price'] = $station['price'] / 1000;
	$cost[$i]['distance'] = $station['distance'];
	$cost[$i]['date_updated'] = $station['date_updated'];
	$cost[$i]['fuel_type'] = $station['fuel_name'];
	$cost[$i]['tank_capacity'] = $tank_capacity;
	usort($cost, "compare");
	$i++;
}

echo json_encode($cost);
mysqli_close($con);
 ?>
