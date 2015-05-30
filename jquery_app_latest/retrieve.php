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
	$currentUser   = $_POST[ "username" ];
}

$servername = "localhost";
$username = "root";
$password = "password";
$db = "results";

$firephp->log($currentUser, 'CurrentUser');

// Create connection
$connect = new mysqli( $servername, $username, $password, $db );
// Check connection
if ( $connect->connect_error ) {
    die( "Connection failed: " . $connect->connect_error );
}

// Select all tables in database that are associated with the current user (TODO: Narrow this search down to specifically the Results database)
$sql = "SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE '".$currentUser."_____' or TABLE_NAME LIKE '".$currentUser."_____-____' ";
$queryResult = $connect->query( $sql );

$firephp->log($queryResult, 'QueryResult');

// ***************************************************************************************
// -----------------------------------Parse Zip Codes-------------------------------------
// ***************************************************************************************

$pattern = '/'.$currentUser.'(\d*)/';

//$numRows = mysqli_num_rows( $queryResult );

for ( $counter = 0; $row = mysqli_fetch_array( $queryResult, MYSQLI_NUM ); $counter++ ){

	// Parse out username from table name 
	preg_match( $pattern, $row[0], $matches );

	//if ( $counter++ != $numRows ) {
		$zipCode = ' ' . $matches[ 1 ] . ', ';
	/*}  else {
		$zipCode = ' ' . $matches[ 1 ];
	} */
	echo( $zipCode );
}

$connect->close();

/*
Push current table output to a unique table in the database, generate a random
key that is returned to the user for access later via the "Load Entry" button
*/

?>