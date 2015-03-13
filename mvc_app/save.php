<?php
// declare variables from form and set to empty strings
$name = $address = $rent = $amenities = $pets = $url = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = clean_input($_POST["text0"]);
	$address = clean_input($_POST["text1"]);
	$rent = clean_input($_POST["text2"]);
	$amenities = clean_input($_POST["text3"]);
	$pets = clean_input($_POST["text4"]);
	$url = clean_input($_POST["text5"]);
}

// format and sanitize the input via htmlspecialchars
function clean_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

/* MySQL processing will go here

$servername = "localhost";
$username = "username";
$password = "password";

$connect = new mysqli($servername, $username, $password);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error);
}
echo "Connected successfully";

Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button

*/
?>

