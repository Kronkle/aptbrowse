<?php
// Handle user login here
session_start();
// Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

// Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

$servername = "localhost";
$dbname = "accounts";
$username = "root";
$password = "password";

$connect = new mysqli($servername, $username, $password);
$connect->select_db($dbname);

// Get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

if (!empty($_POST['username']) && !empty($_POST['password'])) {

	$username = $connect->real_escape_string($_POST['username']);
	$password = md5($connect->real_escape_string($_POST['password']));

	// Check accounts db for inputted username in users table
	$sql = $connect->query("SELECT * FROM users WHERE Username = '".$username."' AND Password = '".$password."'");

	if ( $sql->num_rows == 1 ) {
		$firephp->log("You've logged in, $username");
	} else {
			$firephp->log("Login credentials failed");
			http_response_code(400);
	}
} else {
	$firephp->log("Error receiving login username/password from browser");
	http_response_code(400);
}


?>