<?php
$host = 'localhost';
$user = 'root';
$pass = 'ghjdfkfhABC123';
$db = 'fuel';

$con = mysqli_connect($host, $user, $pass, $db);
if (!$con) {
	echo "unable to connect";
	echo("Error description: " . mysqli_error($con));
}
?>
