<?php
/* 
 *  initDB.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Create "accounts" and "results" databases
 *  3) Connect to "accounts" database and create "users" table
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
// ----------------------------Create Accounts and Results DBs----------------------------
// ***************************************************************************************

$servername = "localhost";
$username = "root";
$password = "password";

$connect = new mysqli( $servername, $username, $password );

if ( $connect->connect_error ) {
	die( "Connection failed: " . $connect->connect_error );
}

$firephp->log( "Connected successfully" );

// Create database for user accounts
$sql = "CREATE DATABASE accounts";
if ( $connect->query($sql) === TRUE ) {
	echo "Successfully created accounts database\n";
} else {
	echo "Error creating accounts database: " . $connect->error;
}

// Create database for saved search results
$sql = "CREATE DATABASE results";
if ( $connect->query( $sql ) === TRUE ) {
	echo "Successfully created results database\n";
} else {
	echo "Error creating database: " . $connect->error;
}

$connect->close();

// ***************************************************************************************
// -----------------------------------Create Users Table----------------------------------
// ***************************************************************************************

$database = "accounts";

$connect = new mysqli( $servername, $username, $password, $database );

$sql = "CREATE TABLE users (
	UserID   INT(25) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	Username VARCHAR(65) NOT NULL ,
	Password VARCHAR(32) NOT NULL
)";

if ( $connect->query( $sql ) === TRUE ) {
	echo "Successfully crated users table in accounts database\n";
} else {
	echo "Error creating table: " . $connect->error;
}

$connect->close();

?>