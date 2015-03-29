<?php

//Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

//Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

//get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

$firephp->log("FirePHP Test Output!");

//MySQL processing will go here
$servername = "localhost";
$username = "root";
$password = "password";
$db = "aptbrowseDB";

//Connect to the aptbrowse db
$connect = new mysqli($servername, $username, $password, $db);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error);
}

echo "Connected successfully\n";

//Need protection against SQL injection here
$sql = "DROP DATABASE aptbrowseDB"; 

if ($connect->query($sql) === TRUE) {
	echo "aptbrowseDB deleted\n";
} else {
	echo "Error deleting aptbrowseDB: " . $connect->error . "\n";
}

//Recreate database for apartment search results
$sql = "CREATE DATABASE aptbrowseDB";

if ($connect->query($sql) === TRUE) {
	echo "aptbrowseDB recreated\n";
} else {
	echo "Error recreating aptbrowseDB" . $connect->error . "\n";
}

$connect->close();

/*Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button*/

?>

