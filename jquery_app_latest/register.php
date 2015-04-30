<?php

if ( !empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']) ) {
	// user is logged in, allow access to app
	//Return HTML for account name at the top right of navbar
}
elseif ( !empty($POST['username']) && !empty($_POST['password']) ) {
	// user is logging in
	//Eliminate login/registration popover
}
else {
	// user isn't logged in, display login/registration form
	//Echo bootstrap popover here
}


?>