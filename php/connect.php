<?php
$host = 'localhost';
$user = 'basicBitch';
$pass = 'i7T5HanUjKvQfOSnS';
$db = 'fuel';

$con = mysqli_connect($host, $user, $pass, $db);
if (!$con) {
        echo "unable to connect";
        echo("Error description: " . mysqli_error($con));
}
?>
