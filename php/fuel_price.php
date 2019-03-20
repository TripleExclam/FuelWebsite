<?php
include("connect.php");
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://fppdirectapi-prod.fuelpricesqld.com.au/Price/GetSitesPrices?countryId=21&geoRegionLevel=3&geoRegionId=1");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization:FPDAPI SubscriberToken=451C86B9-5634-4B82-8474-F65CBC119368', 'Content-Type: application/json'));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$re = curl_exec($ch);
if($re === false) {
    echo 'Curl error: ' . curl_error($ch);
}
curl_close($ch);
$decodedarray = json_decode($re, true);
//echo var_dump($decodedarray);
for ($j = 0; $j < count($decodedarray["SitePrices"]); $j++) {
	$station_id = $decodedarray["SitePrices"][$j]['SiteId'];
	$fuel_id = $decodedarray["SitePrices"][$j]['FuelId'];
	$date_updated = $decodedarray["SitePrices"][$j]['TransactionDateUtc'];
	$price = $decodedarray["SitePrices"][$j]['Price'];
	$sql = "INSERT INTO price(station_id, price, date_updated, fuel_id) VALUES ('".$station_id."', '".$price."', '".$date_updated."', '".$fuel_id."')";
	$query = mysqli_query($con, $sql);
	if (!$query) {
		$sql = "UPDATE price SET price='".$price."' WHERE station_id='".$station_id."' AND date_updated='".$date_updated."' AND fuel_id='".$fuel_id."'";
		$query2 = mysqli_query($con, $sql);
		if (!$query2) {
			echo("Error description: " . mysqli_error($con));
		}
	}
}
?>
