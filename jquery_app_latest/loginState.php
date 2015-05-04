<?php
// Execute login code dependent on the state of session.php
// Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

// Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance(true);



if ( !empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']) ) {
	// user is logged in, allow access to saved search results
	// Also return HTML for account name at the top right of navbar
	$firephp->log("You are logged in");
}
elseif ( !empty($POST['username']) && !empty($_POST['password']) ) {
	// user is logging in, confirm that their password is correct

	$username = mysqli_real_escape_string($_POST['username']);
	$password = md5(mysqli_real_escape_string($_POST['password']));

	$sql = mysqli_query("SELECT * FROM users WHERE Username = '".$username."' AND Password = '".$password."'");

    if(mysqli_num_rows($sql) == 1)
    {
        $row = mysqli_fetch_array($sql);
         
        $_SESSION['Username'] = $username;
        $_SESSION['LoggedIn'] = 1;

        $firephp->log("You are successfully logged in!");
    }
    else {
    	$firephp->log("User/Password combination is incorrect");
    }

}
else {
	// user isn't logged in, allow access to basic features
}

?>