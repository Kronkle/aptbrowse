<?php

#Include the FirePHP class
require_once('FirePHPCore/FirePHP.class.php');
#Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();
#get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

// declare variables from form and set to empty strings
$output = $pass = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$output = $_POST["outputTable"];
	$pass   = $_POST["pass"];
}


$firephp->log("Output is this!!!");
//MySQL processing will go here
$servername = "localhost";
$username = "root";
$password = "password";
$db = "aptbrowseDB";

$connect = new mysqli($servername, $username, $password, $db);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error);
}

echo "Connected successfully\n";

//Need protection against SQL injection here
$sql = 
	"CREATE TABLE ".$pass."(
		id int not null auto_increment,
		PRIMARY KEY(id),
		results VARCHAR(10000) 
	)";

if ($connect->query($sql) === TRUE) {
	echo "Table $pass created";
} else {
	echo "Error creating table $pass: " . $connect->error;
}

$connect->close();

/*Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button*/


?>

