<?php 
include("connect.php");
$sql = "SELECT DISTINCT * FROM station s, brand_types b WHERE s.brand_id = b.brand_id";
$query = mysqli_query($con, $sql);

$data = array();

$i = 0;
while ($station = mysqli_fetch_array($query)) {
	$data[$i]['name'] = $station['name'];
	$data[$i]['latitude'] = $station['latitude'];
	$data[$i]['longtitude'] = $station['longtitude'];
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