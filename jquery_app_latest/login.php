<?php
/* 
 *  login.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Validate username/password input
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
// ---------------------------------Validate username/password----------------------------
// ***************************************************************************************

$servername = "localhost";
$dbname = "accounts";
$username = "root";
$password = "password";

$connect = new mysqli( $servername, $username, $password );
$connect->select_db( $dbname );

if ( !empty( $_POST[ "username" ] ) && !empty( $_POST[ "password" ] ) ) {

	$username = $connect->real_escape_string( $_POST[ "username" ] );
	$password = md5($connect->real_escape_string( $_POST[ "password" ] ) );

	// Check "accounts" database for inputted username in users table
	$sql = $connect->query( "SELECT * FROM users WHERE Username = '".$username."' AND Password = '".$password."'" );

	if ( $sql->num_rows == 1 ) {
		$firephp->log( "You've logged in, $username" );
		$_SESSION[ "LoggedIn" ] = 1;
		$_SESSION[ "Username" ] = $username;
	} else {
			$firephp->log( "Login credentials failed" );
			http_response_code( 400 );
	}
} else {
	$firephp->log( "Error receiving login username/password from browser" );
	http_response_code( 400 );
}


?>