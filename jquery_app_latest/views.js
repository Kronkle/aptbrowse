/* 
 *  zipSearchView     - Triggers AJAX calls and controller events when user interacts with the navbar and searchbar
 *  apartmentListView - Renders apartment search results
 */

var zipSearchView = function ( zipSearchModel, zipSearchController, resultsModel, resultsController ) {
	$( document ).ready( function () {
		var apartmentListModel = resultsModel;
		var searchZip;

	    // Call to loginState.php for user sessions (this will be moved)
		checkLoginState = function() {
			$.ajax({
				method: "POST",
				url: "loginState.php",
				success: function ( data ) {
					zipSearchController.renderUserOptions();
				},
				error: function () {
				}
			});
		};

		// Check login state as soon as view loads (for page refreshes)
		checkLoginState();

		// ***************************************************************************************
		// ---------------------------------------NAVBAR------------------------------------------
		// ***************************************************************************************

		// For saving current search results to database table associated with username
		$( "#save" ).on( "click", function ( event ) {

			// Check that a search has been run
			if ( !searchZip ) {
				alert( "Please run a zip code search first" );
				return;
			}

			// Encapsulate search output into an object
			var data = $( ".ftablebodyDiv" ).html();

			// Send array to save.php for transmitting into database
			$.ajax({
				method: "POST",
				url: "save.php",
				data: {
					outputTable: data,
					zipCode: searchZip
				},
				success: function ( data ) {
					alert( "Entry has been saved in the table" );
				},
				error: function () {
					alert( "User not logged in" );
				}
			});
		});

		// For creating the MySQL "accounts" and "results" dbs in ADMIN mode - for testing
		$( "#initDB" ).on( "click", function ( event ) {
			$.ajax({
				url: "initDB.php",
				data: {},
				success: function ( data ) {
					alert( "Accounts and results databases have been created" );
				}
			});
		});

		// For deleting the MySQL "accounts" and "results" dbs in ADMIN mode - for testing
		$( "#clearDB" ).on( "click", function ( event ) {
			$.ajax({
				url: "clearDB.php",
				data: {},
				success: function ( data ) {
					alert( "Accounts and results databases have been deleted" );
				}
			});
		});

		// For registering a new user when "Register" button is clicked
		$( "#registerBtn" ).on( "click", function () {

			var username = $( "#usernameR" ).val();
			var password = $( "#passwordR" ).val();
			var confirmPassword = $( "#passwordR2" ).val();

			// Validate that all fields are filled in properly

			if ( username == "" || password == "" || confirmPassword == "" ) {
				alert( "Please fill out all fields" );
			}

			if ( password == confirmPassword ) {
				zipSearchController.registerUser( apartmentListModel, resultsController, username, password );
		    } else {
	        	alert( "Two different passwords entered" );   
		    }
		});

		// For logging in an existing user when "Sign In" button is clicked
		$( "#loginBtn" ).on( "click", function() {

			var username = $("#usernameL").val();
			var password = $("#passwordL").val();

			// Validate that all fields are filled in properly
			if ( username == "" || password == "" ) {
				alert( "Please fill out all fields" );
			} else {
				zipSearchController.loginUser( apartmentListModel, resultsController, username, password );
			}
		});

		// For logging in an existing user when "Sign In" button is clicked
		$( "#logoutBtn" ).on( "click", function() {
				zipSearchController.logoutUser();
		});

		// For refreshing the homepage when "AptBrowse" is clicked
		$( ".navigationMenu" ).on( "click", "#home", function () {
			$( ".search" ).show();
			$( ".break" ).show();
			$( ".ftablebody" ).html( "" );
		});


		// ***************************************************************************************
		// ---------------------------------------SEARCHBAR---------------------------------------
		// ***************************************************************************************


		// For initial processing of searchbar input
		$( ".content" ).on( "click", ".zipSearchBtn", function () {
			searchZip = $("#searchInput").val();
			zipSearchController.handleEvent( apartmentListModel, resultsController );
		});	
	});		
	return this;
};

zipSearchView.prototype.checkLoginState = function () {

};

var apartmentListView = function () {
	return this;
};

apartmentListView.prototype.render = function ( data ) {
	$( document ).ready( function() {

		// Hide spinner and the break element below it
		$( "#spinner" ).hide();
		$( ".break" ).hide();

		// Populate search results table with apartment data
		$( ".ftablebody" ).html( data );
	});
};