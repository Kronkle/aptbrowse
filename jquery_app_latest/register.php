<?php

if ( !empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']) ) {
	// user is logged in, allow access to saved search results
	// Also return HTML for account name at the top right of navbar
}
elseif ( !empty($POST['username']) && !empty($_POST['password']) ) {
	// user is signing up, check db for username to see if it already exists
	// if not, place username and password in accounts db

}
else {
	// user isn't logged in allow access to basic app only
}


?>