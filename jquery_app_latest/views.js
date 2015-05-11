/* 
 *  zipSearchView     - Triggers AJAX calls and controller events when user interacts with the navbar and searchbar
 *  apartmentListView - Renders apartment search results
 */

var zipSearchView = function ( zipSearchModel, zipSearchController, resultsModel, resultsController ) {
	$( document ).ready( function () {
		var apartmentListModel = resultsModel;


		// ***************************************************************************************
		// ---------------------------------------NAVBAR------------------------------------------
		// ***************************************************************************************


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
			zipSearchController.handleEvent( apartmentListModel, resultsController );
		});	
	});		
	return this;
};

var apartmentListView = function () {
	return this;
};

apartmentListView.prototype.render = function ( data ) {
	$( document ).ready( function() {

		// Hide spinner and the break element below it
		$( ".spinner" ).hide();
		$( ".break" ).hide();

		// Populate search results table with apartment data
		$( ".ftablebody" ).html( data );
	});
};