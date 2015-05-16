<?php
/* 
 *  TODO: Merge functionality with login.php and register.php
 *  loginState.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Validate username/password input
 */

// ***************************************************************************************
// ---------------------------------------FirePHP-----------------------------------------
// ***************************************************************************************

require_once('FirePHPCore/FirePHP.class.php');

// Start buffering the output - not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance( true );

// ***************************************************************************************
// ---------------------------------Validate login state----------------------------------
// ***************************************************************************************

if ( !empty( $_SESSION[ 'LoggedIn' ] ) && !empty( $_SESSION[ 'Username' ] ) ) {

	// user is logged in, allow access to saved search results
	// Also return HTML for account name at the top right of navbar
	$firephp->log( "You are logged in" );
    
}
elseif ( !empty( $POST[ 'username' ] ) && !empty( $_POST[ 'password' ] ) ) {

    // user is logging in, confirm that their password is correct (merge with login.php)
    $firephp->log( "You are logging in" );


	$username = mysqli_real_escape_string( $_POST[ 'username' ] );
	$password = md5( mysqli_real_escape_string( $_POST[ 'password' ] ) );

	$sql = mysqli_query( "SELECT * FROM users WHERE Username = '".$username."' AND Password = '".$password."'" );

    if ( mysqli_num_rows( $sql ) == 1 )
    {
        $row = mysqli_fetch_array( $sql );
         
        $_SESSION[ 'Username' ] = $username;
        $_SESSION[ 'LoggedIn' ] = 1;

        $firephp->log( "You are successfully logged in!" );
    }
    else {
    	$firephp->log( "User/Password combination is incorrect" );
    }

}
else {
	// user isn't logged in, allow access to basic features
    $firephp->log( "You aren't logged in yet" );
}

?>