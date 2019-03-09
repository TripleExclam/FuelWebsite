<?php

//Connects to the database.
//Add api security features here.

$host = 'localhost:3308';
$user = 'root';
$pass = '';
$db = 'fuel';

$con = mysqli_connect($host, $user, $pass, $db);
if (!$con) {
	echo "unable to connect";
	echo("Error description: " . mysqli_error($con));
}
?>