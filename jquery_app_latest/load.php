<?php
/* 
 *  load.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Retrieve chosen search results table via user-provided zip code
 *  3) Parse out and return HTML for chosen table
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
// ----------------------------------Retrieve Chosen Table--------------------------------
// ***************************************************************************************

if ( $_SERVER[ "REQUEST_METHOD" ] == "POST" ) {
	//Escape special characters in output table html for MySql insertion
	$zipCode   = $_POST[ "zipCode" ];
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

// ***************************************************************************************
// ---------------------------------Parse and Return Table HTML---------------------------
// ***************************************************************************************

echo $zipCode;

$connect->close();


?>