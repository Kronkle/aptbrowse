<?php

//Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

//Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

//get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

// declare variables from form and set to empty strings
$output = $pass = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	//Escape special characters in output table html for MySql insertion
	$output = $_POST["outputTable"];
	$pass   = $_POST["pass"];
}

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

//Iterate through html in output and pass into newly created table
$dom = new DOMDocument;
$dom->loadHTML($output);

//Clean out top-level dom elements
$dom->removeChild($dom->doctype);
$dom->replaceChild($dom->firstChild->firstChild->firstChild, $dom->firstChild);

//Declare variables to hold html elements in output table
$tableTags = $tableBodyTags = $tableRowTags = "";

//Sort each tag type into a different variable
$tableTags = $dom->getElementsByTagName("table");

//Extras for debugging
$tableBodyTags = $dom->getElementsByTagName('tbody');
$tableRowTags = $dom->getElementsByTagName('tr');

$tableInputElements = array();

foreach($dom->getElementsByTagName("tr") as $node) {
		$tableInputElements[] = $dom->saveHTML($node);
}

print_r($tableInputElements);

foreach($tableInputElements as $tr){
	$tr = $connect->real_escape_string($tr);
	$sql = 
		"INSERT INTO ".$pass." (results)
			VALUES ('$tr')";

	if ($connect->query($sql) === TRUE) {
		echo "Table $pass created";
	} else {
		printf("Error creating table $pass: " . $connect->error);
	}
}

$connect->close();

/*Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button*/


?>

