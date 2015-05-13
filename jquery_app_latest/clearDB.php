<?php
/* 
 *  clearDB.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Connect to "accounts" database and delete it
 *  3) Connect to "results" database and delete it
 */

// ***************************************************************************************
// ---------------------------------------FirePHP-----------------------------------------
// ***************************************************************************************

require_once( "FirePHPCore/FirePHP.class.php" );

// Start buffering the output - not required if output_buffering is set on in php.ini file
ob_start();

// Get a FirePHP variable reference
$firephp = FirePHP::getInstance( true );

$firephp->log( "FirePHP Test Output!" );

// ***************************************************************************************
// ---------------------------------------Delete Accounts DB------------------------------
// ***************************************************************************************

$servername = "localhost";
$username = "root";
$password = "password";
$database = "accounts";

$connect = new mysqli( $servername, $username, $password, $database );

if ( $connect->connect_error ) {
	die( "Connection failed: " . $connect->connect_error );
}

echo "Connected successfully\n";

$sql = "DROP DATABASE accounts"; 

if ( $connect->query( $sql ) === TRUE ) {
	echo "accounts database deleted\n";
} else {
	echo "Error deleting accounts database: " . $connect->error . "\n";
}

$connect->close();

// ***************************************************************************************
// ---------------------------------------Delete Results DB-------------------------------
// ***************************************************************************************

$database = "results";

$connect = new mysqli( $servername, $username, $password, $database );

$sql = "DROP DATABASE results"; 

if ( $connect->query( $sql ) === TRUE ) {
	echo "results database deleted\n";
} else {
	echo "Error deleting results database: " . $connect->error . "\n";
}

$connect->close();

?>

