<?php

//Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

//Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

//get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

// declare variables from form and set to empty strings
$pass = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	//Escape special characters in output table html for MySql insertion
	$pass   = $_POST["pass"];
}

$firephp->log("FirePHP Test Output!");

//MySQL processing will go here
$servername = "localhost";
$username = "root";
$password = "password";
$db = "aptbrowseDB";

// Create connection
$connect = new mysqli($servername, $username, $password, $db);
// Check connection
if ($connect->connect_error) {
    die("Connection failed: " . $connect->connect_error);
}

$sql = "SELECT * FROM Mike";
$result = $connect->query($sql);
echo $result;

/* if ($connect->query($sql) === TRUE) {
	echo "Table $pass retrieved";
} else {
	echo "Error retrieving table $pass: " . $connect->error;
} */


$connect->close();

/*
Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button
*/


?>

