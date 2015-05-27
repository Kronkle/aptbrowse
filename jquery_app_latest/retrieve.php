<?php
/* 
 *  retrieve.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Retrieve search results tables associated with current user
 *  3) Parse out and return zip codes associated with each table
 */

// Begin a session for persistent user login
session_start();

// ***************************************************************************************
// ---------------------------------------FirePHP-----------------------------------------
// ***************************************************************************************

require_once( "FirePHPCore/FirePHP.class.php" );

// Start buffering the output - not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance( true );

$firephp->log( "FirePHP Test Output!" );

// ***************************************************************************************
// -----------------------------------Retrieve User Tables--------------------------------
// ***************************************************************************************

if ( $_SERVER[ "REQUEST_METHOD" ] == "POST" ) {
	//Escape special characters in output table html for MySql insertion
	$pass   = $_POST[ "pass" ];
}

$firephp->log( "FirePHP Test Output!" );

$servername = "localhost";
$username = "root";
$password = "password";
$db = "results";

// Create connection
$connect = new mysqli( $servername, $username, $password, $db );
// Check connection
if ( $connect->connect_error ) {
    die( "Connection failed: " . $connect->connect_error );
}

$sql = "SELECT * FROM $pass";
$queryResult = $connect->query( $sql );
$htmlOutput = "";

while( $row = mysqli_fetch_array( $queryResult, MYSQLI_NUM ) ){
	// The second element of each row array will contain the HTML
	$htmlOutput .= $row[1];
}

// ***************************************************************************************
// -----------------------------------Parse Zip Codes-------------------------------------
// ***************************************************************************************

echo $htmlOutput;

$connect->close();

/*
Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button
*/

?>