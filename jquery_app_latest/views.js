/* 
*  Two views will be presented for now: a view for rendering the search bar and a view
*  for displaying the search results.
*/

var zipSearchView = function ( zipSearchModel, zipSearchController, resultsModel, resultsController ) {
	var apartmentListModel = resultsModel;
	
	// For initializing the accounts and results dbs in admin mode (move this to a different view?)
	$( "#initDB" ).on("click", function ( event ) {
		$.ajax({
			url: "initDB.php",
			data: {},
			success: function ( data ) {
				alert("User and results databases have been created");
			}
		});
	});

	// For deleting the accounts and results dbs in admin mode (move this to a different view?)
	$( "#clearDB" ).on("click", function ( event ) {
		$.ajax({
			url: "clearDB.php",
			data: {},
			success: function ( data ) {
				alert("User and results databases have been deleted");
			}
		});
	});

	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipSearch=document.getElementById("zipSearchBtn");
	zipSearch.addEventListener( "click", function ( ) {
		zipSearchController.handleEvent( apartmentListModel, resultsController );
	});

	//Either change zipSearchView into a generic homepage view or add another view later for registration/login specifically
	var register=document.getElementById("registerBtn");
	register.addEventListener( "click", function ( ) {
		var username = document.getElementById("usernameR").value;
		//Password validation here
		var password = document.getElementById("passwordR").value;
		zipSearchController.registerUser( apartmentListModel, resultsController, username, password );
	});

	var login=document.getElementById("loginBtn");
	login.addEventListener( "click", function ( ) {
		var username = document.getElementById("usernameL").value;
		//Password validation here
		var password = document.getElementById("passwordL").value;
		zipSearchController.loginUser( apartmentListModel, resultsController, username, password );
	});

	return this;
};

var apartmentListView = function () {
	return this;
};

apartmentListView.prototype.render = function ( data ) {
	$(document).ready(function(){

		// Remove searchbar and the break element below
		$("#search").html("");
		$("#break").html("");

		// Populate search results table
		$("#ftablebody").html(data);
	});
};