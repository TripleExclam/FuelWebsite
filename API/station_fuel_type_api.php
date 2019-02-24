<?php  

$brand = $_GET['brand'];
     
$petrol = isset($_GET['fuel']) ? $_GET['fuel'] : false;

include('connect.php');

// All APIS need to be protected

$sql = "SELECT DISTINCT f.* FROM fuel_types f, price p, station s WHERE f.fuel_id = p.fuel_id AND s.id = p.station_id AND s.brand_id = '".$brand."' GROUP BY f.fuel_id";
if ($brand == "") {
	$sql = "SELECT DISTINCT f.* FROM fuel_types f, price p, station s WHERE f.fuel_id = p.fuel_id AND s.id = p.station_id GROUP BY f.fuel_id";
}
$query = mysqli_query($con, $sql);
if (!$query) {
	echo("Error description: " . mysqli_error($con));
}

$data = array();
//$data['fuel'][0] = false;
$i = 0;
while($fuel = mysqli_fetch_array($query)) {
	$data['data'][$i]['name'] = $fuel['fuel_name'];
	$data['data'][$i]['id'] = $fuel['fuel_id']; 

	if ($petrol && $fuel['fuel_id'] == $petrol) {
		$data['fuel'] = $petrol;
	}

	$i++;
}

echo json_encode($data);


?>