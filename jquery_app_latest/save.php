<?php
session_start();
/* 
 *  save.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Verify that user is logged in via Session variables
 *  3) Create a table in results database
 *	4) Populate table with search results
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
		$output = $_POST[ "outputTable" ];
		$zip   = $_POST[ "zipCode" ];
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

	// Table name will be current username appended to the search zip code
	$tableName = $_SESSION[ "Username" ] . $zip;
	$firephp->log( "$tableName" );

	// Create results table 
	$sql = 
	"CREATE TABLE ".$tableName."(
		id int not null auto_increment,
		PRIMARY KEY(id),
		results VARCHAR(10000) 
	)";

	if ( $connect->query( $sql ) === TRUE ) {
		echo "Table $tableName created";
	} else {
		echo "Error creating table: " . $connect->error;
	}

// ***************************************************************************************
// ------------------------------Populate Results Table-----------------------------------
// ***************************************************************************************

	// Iterate through html in output and pass into newly created table
	$dom = new DOMDocument;
	$dom->loadHTML( $output );

	// Clean out top-level dom elements
	$dom->removeChild( $dom->doctype );
	$dom->replaceChild( $dom->firstChild->firstChild->firstChild, $dom->firstChild );

	// Declare variables to hold html elements in output table
	$tableTags = $tableBodyTags = $tableRowTags = "";

	// Sort each tag type into a different variable
	$tableTags = $dom->getElementsByTagName( "table" );
	$tableBodyTags = $dom->getElementsByTagName( "tbody" );
	$tableRowTags = $dom->getElementsByTagName( "tr" );
	
	$tableInputElements = array();

	// Append every table row of apartment information to array
	foreach( $tableRowTags as $node ) {
		$tableInputElements[] = $dom->saveHTML( $node );
	}

	// Print array for debugging
	print_r( $tableInputElements );

	// Insert each tr element into created results table
	foreach( $tableInputElements as $tr ) {
		$tr = $connect->real_escape_string( $tr );
		$sql = 
			"INSERT INTO ".$tableName." (results)
			VALUES ('$tr')";

		if ($connect->query( $sql ) === TRUE) {
			echo "Table $tableName populated";
		} else {
			echo "Error populating table $tableName: " . $connect->error;
		}
	}

	$connect->close();

} else {
	$firephp->log( "User not logged in" );
	http_response_code( 400 );
}
		
?>

