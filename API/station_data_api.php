<?php 
include("connect.php");
$sql = "SELECT DISTINCT * FROM station s, brand_types b WHERE b.brand_id = s.brand_id";
$query = mysqli_query($con, $sql);

$data = array();

$i = 0;
while ($station = mysqli_fetch_array($query)) {
	$sql2 = "SELECT DISTINCT * FROM price p, fuel_types f WHERE p.station_id = '".$station['id']."' AND p.date_updated >= ALL (SELECT date_updated FROM price p2 WHERE p2.fuel_id = p.fuel_id AND p2.station_id = p.station_id) AND p.fuel_id = f.fuel_id";
	$query2 = mysqli_query($con, $sql2);


	if ($i == 1000) {
		break;
	}
	$data[$i]['name'] = $station['name'];
	$data[$i]['latitude'] = $station['latitude'];
	$data[$i]['longtitude'] = $station['longtitude'];
	if (mysqli_num_rows($query2) == 0) {
		continue;
	}
	$j = 0;
	while ($station_price = mysqli_fetch_array($query2)) {
		$data[$i]['prices'][$j]['price'] = $station_price['price'];
		$data[$i]['prices'][$j]['fuel'] = $station_price['fuel_name'];
		$j++;
	}

	if ($station['brand_name'] == "BP" || $station['brand_name'] == "Caltex" || $station['brand_name'] == "Mobil" || $station['brand_name'] == "United") {
		$data[$i]['provider'] = $station['brand_name'];
	} else if ($station['brand_name'] == "Coles Express") {
		$data[$i]['provider'] = "FreedomFuels";
	} else if ($station['brand_name'] == "7 Eleven") {
		$data[$i]['provider'] = "Seven11";
	} else if ($station['brand_name'] == "FreedomFuels") {
		$data[$i]['provider'] = "FreedomFuels";
	} else if ($station['brand_name'] == "Caltex/Woolworths") {
		$data[$i]['provider'] = "CaltexWoolworths";
	}else {
		$data[$i]['provider'] = "default";
	}
	$i++;
}

echo json_encode($data);

?>