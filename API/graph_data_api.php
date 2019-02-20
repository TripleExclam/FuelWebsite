<?php 
include("connect.php");
$sql = "SELECT AVG(price) as price, date_updated FROM price WHERE station_id IN (SELECT id FROM station WHERE brand_id = '".$_GET['brand_id']."') AND fuel_id = '".$_GET['fuel_type']."' GROUP BY DATE_FORMAT(date_updated, '%d/%m/%Y') ORDER BY date_updated";
$query = mysqli_query($con, $sql);
if (!$query) {
	echo("Error description: " . mysqli_error($con));
}
$data = array();
$i = 0;
while ($price = mysqli_fetch_array($query)) {
	$data[$i]['date_updated'] = $price['date_updated'];
	$data[$i]['price'] = $price['price']/10;
	$i++;
}

$x_values = array();
$y_values = array();
$x_values[0] = 0;
$y_values[0] = $data[0]['price'];
for ($i = 1; $i < count($data); $i++) {
	$earlier = strtotime($data[$i-1]['date_updated']);
	$later = strtotime($data[$i]['date_updated']);
	$x_values[$i] = round(($later-$earlier)/ (60 * 60 * 24)) + $x_values[$i-1];
	$y_values[$i] = $data[$i]['price'];
}
$x_mean = array_sum($x_values)/count($x_values);
$y_mean = array_sum($y_values)/count($y_values);

$top = 0;
$bottom = 0;
for ($i = 0; $i < count($x_values); $i++) {
	$top += ($x_values[$i] - $x_mean) * ($y_values[$i] - $y_mean);
	$bottom += pow(($x_values[$i] - $x_mean), 2);
}


$gradient = $top/$bottom;
$y_intercept = $y_mean - $gradient*$x_mean;
for ($i = 0; $i < count($x_values); $i++) {
	$data[$i]['regression_price'] = $gradient * $x_values[$i] + $y_intercept;
}
//echo var_dump($x_values);
//echo "The gradient and y-int are: " . $gradient . "   " . $y_intercept . "<br>";
echo json_encode($data);

?>

