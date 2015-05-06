<?php
// Handle user registration here

// Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

// Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

if (!empty($_POST['username']) && !empty($_POST['password'])) {

	$username = mysqli_real_escape_string($_POST['username']);
	$password = md5(mysqli_real_escape_string($_POST['password']));

	// Check accounts db for inputted username in users table
	$sql = mysqli_query("SELECT * FROM users WHERE Username = '".$username."'");

	if ( mysqli_num_rows($sql) == 1 ) {
		$firephp->log("Username is already taken");
	} else {
		$sql = mysqli_query("INSERT INTO users (Username, Password) VALUES('".$username."', '".$password."')");
		if ( $sql ) {
			$firephp->log("Accoutn created");
		} else {
			$firephp->log("Error creating account");
		}
	}
}


?>