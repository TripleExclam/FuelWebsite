
<?php

$postcode = 4250;
$radi = 0;

include("connect.php");
$ch = curl_init();
curl_setopt ($ch, CURLOPT_CAINFO, "C:\wamp64\bin\php\php7.2.10\cacert.pem");
curl_setopt($ch, CURLOPT_URL, "https://fppdirectapi-prod.fuelpricesqld.com.au/Subscriber/GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=1");
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
for ($j = 0; $j < count($decodedarray["S"]); $j++) {
	$name = addslashes($decodedarray["S"][$j]["N"]);
	$location = addslashes($decodedarray["S"][$j]["A"]);
	$latitude = $decodedarray["S"][$j]["Lat"];
	$longtitude = $decodedarray["S"][$j]["Lng"];
	$id = $decodedarray["S"][$j]["S"];
	$postcode = $decodedarray["S"][$j]["P"];
	$brand_id = $decodedarray["S"][$j]["B"];

	$sql = "INSERT INTO station(name, location, latitude, longtitude, id, postcode, brand_id) VALUES ('".$name."', '".$location."', '".$latitude."', '".$longtitude."', '".$id."', '".$postcode."', '".$brand_id."')";
	$query = mysqli_query($con, $sql);
	if (!$query) {
		$sql = "UPDATE station SET name='".$name."', location='".$location."', latitude='".$latitude."', longtitude='".$longtitude."', postcode='".$postcode."', brand_id='".$brand_id."' WHERE id='".$id."' ";
		$query = mysqli_query($con, $sql);
		if (!$query) {
			echo("Error description: " . mysqli_error($con));
		}
	}
}

?>
