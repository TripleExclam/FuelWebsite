<?php 
include("connect.php");
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://fppdirectapi-prod.fuelpricesqld.com.au/Subscriber/GetCountryFuelTypes?countryId=21");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization:FPDAPI SubscriberToken=451C86B9-5634-4B82-8474-F65CBC119368', 'Content-Type: application/json'));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$re = curl_exec($ch);
if($re === false) {
    echo 'Curl error: ' . curl_error($ch);
}
curl_close($ch);
$decodedarray = json_decode($re, true);
//
//for ($i = 0; $i < count($decodedarray['Fuels']); $i++) {
//	$sql = "INSERT INTO fuel_types(fuel_id, fuel_name) VALUES ('".$decodedarray['Fuels'][$i]['FuelId']."', '".$decodedarray['Fuels'][$i]['Name']."')";
//	$query = mysqli_query($con, $sql);
//	if (!$query) {
//		echo("Error description: " . mysqli_error($con));
//	}
//}

//$fuel_types = array();

//echo var_dump($fuel_types);


 ?>
