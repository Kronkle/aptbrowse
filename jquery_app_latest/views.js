/* 
*  Two views will be presented for now: a view for rendering the search bar and a view
*  for displaying the search results.
*/

var zipSearchView = function ( zipSearchModel, zipSearchController, resultsModel, resultsController ) {
	$( document ).ready(function() {
		var apartmentListModel = resultsModel;

		//For initializing the accounts and results dbs in admin mode (move this to a different view?)
		$( "#initDB" ).on("click", function ( event ) {
			$.ajax({
				url: "initDB.php",
				data: {},
				success: function ( data ) {
					alert("User and results databases have been created");
				}
			});
		});

		//For deleting the accounts and results dbs in admin mode (move this to a different view?)
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
		$(".content").on('click', '.zipSearchBtn', function () {
			zipSearchController.handleEvent( apartmentListModel, resultsController );
		});

		var register=document.getElementById("registerBtn");
		register.addEventListener( "click", function ( ) {
			var username = document.getElementById("usernameR").value;
			
			//Password validation here
			var password = document.getElementById("passwordR").value;
			var confirmPassword = document.getElementById("passwordR2").value;

			if ( username == "" || password == "" || confirmPassword == "" ) {
				alert("Please fill out all fields");
			}

			if ( password == confirmPassword ) {
				zipSearchController.registerUser( apartmentListModel, resultsController, username, password );
		    } else {
	        	alert("Two different passwords entered");   
		    }
		});

		var login=document.getElementById("loginBtn");
		login.addEventListener( "click", function ( ) {
			var username = document.getElementById("usernameL").value;
			//Password validation here
			var password = document.getElementById("passwordL").value;

			if ( username == "" || password == "" ) {
				alert("Please fill out all fields");
			} else {
				zipSearchController.loginUser( apartmentListModel, resultsController, username, password );
			}
		});

		//For resetting homepage when AptBrowse logo is clicked - clone both div and attached event handlers
		//var homeClone = $(".searchContent").clone(true, true);

		//Either change zipSearchView into a generic homepage view or add another view later for registration/login specifically
		$(".navigationMenu").on('click', '#home', function () {
			$(".search").show();
			$(".break").show();
			$(".ftablebody").html("");
		});
	});
	return this;
};

var apartmentListView = function () {
	return this;
};

apartmentListView.prototype.render = function ( data ) {
	$(document).ready(function(){

		// Remove spinner and the break element below
		$(".spinner").hide();
		$(".break").hide();

		// Populate search results table
		$(".ftablebody").html(data);
	});
};