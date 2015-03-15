<?php
// declare variables from form and set to empty strings
$output = $pass = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$output = $_POST["output"];
	$pass   = $_POST["pass"];
}

echo $output;

/*MySQL processing will go here
$servername = "localhost";
$username = "username";
$password = "password";

$connect = new mysqli($servername, $username, $password);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error);
}

echo "Connected successfully";

$sql = 
	"CREATE TABLE $pass (
		results VARCHAR(MAX) 
	)"

$conn->close();
*/
/*Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button*/


?>

