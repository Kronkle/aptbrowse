<?php
session_start();
/* 
 *  save.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Verify that user is logged in via Session variables
 *  3) Create a table in results database
 *		3a) Username = key -> zip code = key -> search results  table
 */

// ***************************************************************************************
// ---------------------------------------FirePHP-----------------------------------------
// ***************************************************************************************

require_once( "FirePHPCore/FirePHP.class.php" );

//Start buffering the output - not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance( true );

$firephp->log( "FirePHP Test Output!" );

// ***************************************************************************************
// ---------------------------------Create Results Table----------------------------------
// ***************************************************************************************

if ( $_SESSION[ "LoggedIn" ] && $_SESSION[ "Username" ] ) {

	if ($_SERVER[ "REQUEST_METHOD" ] == "POST") {
		//Escape special characters in output table html for MySql insertion
		$output = $_POST["outputTable"];
		$zip   = $_POST["zipCode"];
	}

	$firephp->log( "$zip" );
	$firephp->log( "$output" );

	// Login to database
	$servername = "localhost";
	$username = "root";
	$password = "password";
	$db = "results";

	// Connect to the aptbrowse db
	$connect = new mysqli( $servername, $username, $password, $db );

	if ( $connect->connect_error ) {
		die( "Connection failed: " . $connect->connect_error );
	}

	echo "Connected successfully\n";

	// Put filler zip code as table name (for now)
	$zip = "28027";

	$sql = 
	"CREATE TABLE ".'$zip'."(
		id int not null auto_increment,
		PRIMARY KEY(id),
		results VARCHAR(10000) 
	)";

	if ( $connect->query( $sql ) === TRUE ) {
		echo "Table $zip created";
	} else {
		echo "Error creating table: " . $connect->error;
	}

	$connect->close();

} else {
	$firephp->log( "User not logged in" );
	http_response_code( 400 );
}
		

/*
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
*/


?>

