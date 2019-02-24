<?php 
include("connect.php");
$ch = curl_init();
curl_setopt ($ch, CURLOPT_CAINFO, "C:\wamp64\bin\php\php7.2.10\cacert.pem");
curl_setopt($ch, CURLOPT_URL, "https://fppdirectapi-prod.fuelpricesqld.com.au/Subscriber/GetCountryBrands?countryId=21");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization:FPDAPI SubscriberToken=451C86B9-5634-4B82-8474-F65CBC119368', 'Content-Type: application/json'));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$re = curl_exec($ch);
if($re === false) {
    echo 'Curl error: ' . curl_error($ch);
}
curl_close($ch);
$decodedarray = json_decode($re, true);

for ($i = 0; $i < count($decodedarray['Brands']); $i++) {
	$sql = "INSERT INTO brand_types(brand_id, brand_name) VALUES ('".$decodedarray['Brands'][$i]['BrandId']."', '".$decodedarray['Brands'][$i]['Name']."')";
	$query = mysqli_query($con, $sql);
	if (!$query) {
			echo("Error description: " . mysqli_error($con));
	}
}



 ?>