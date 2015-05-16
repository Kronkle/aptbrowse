/*
 *  zipSearchController     - Query the Google Places API with user search input and update apartmentListModel with results
 *  apartmentListController - Use search results HTML generated from the model to update the apartmentListView
 */

var zipSearchController = function () {
	return this;
};

zipSearchController.prototype.registerUser = function ( resultsModel, resultsController, username, password ) {

    // For use with greeting upon registering
    var username = username;

    var data = "username=" + username + "&" + "password=" + password;

    $.ajax({
    	url: "register.php",
    	data: data,
    	success: function ( data ) {
    		if ( data ) {
    			alert( "Username is already taken" );
    		} else {
    			alert( "Account created!" );
    			$( "#registerMenu" ).hide();
    			$( "#loginMenu" ).html( "<li>Welcome, " + username + "</li>" );
    		}
    	},
    	error: function () {
    		alert( "Problem with registration request" );	
    	}
    });
};

zipSearchController.prototype.loginUser = function ( resultsModel, resultsController, username, password ) {

    // For use with greeting upon login
    var username = username;
    
    var data = "username=" + username + "&" + "password=" + password;

    $.ajax({
    	url: "login.php",
    	data: data,
    	success: function ( data ) {
 			$( "#registerMenu" ).hide();
 			$( "#loginMenu" ).html( "<li>Welcome, " + username + "</li>" );
    	},
    	error: function () {
    		alert( "Problem with login request" );
    	}
    });
};

zipSearchController.prototype.handleEvent = function ( resultsModel, resultsController ) {

		var apartmentListModel = resultsModel;

		var zip = $( ".zipSearch" ).val();

		if ( zip ) {

			// U.S. zipcode validation - 5 digits or 5 digits followed by hyphen and 4 digits
			var regex = new RegExp(/(^\d{5}-\d{4}$)|(^\d{5}$)/)

			if ( regex.test( zip ) ){							
				this.zipSearch( zip, resultsModel, resultsController );
				
				// Hide searchbar and show loading spinner
				$( ".search" ).hide();
				$( "#spinner" ).show();
			} else {
				alert( "Please enter a valid U.S. zipcode." );
			}
		} else {
			alert( "Please enter a valid U.S. zipcode." );
		}
};

zipSearchController.prototype.zipSearch = function ( zip, resultsModel, resultsController ) {

	// Create Geocoder and relevant variables for zipcode to lat/lng coordinates conversion
	var geocoder = new google.maps.Geocoder();
	var address = zip;
	var lat = '';
	var lng = '';

	var me = this;
	var apartmentListModel = resultsModel;

	// Include callback function since geocoder method works asynchronously
	geocoder.geocode( { 'address': address }, function( results_array, status ) { 
		if ( status == google.maps.GeocoderStatus.OK ){
	        
	        // Convert user zipcode into lat/lng coordinates for Google Places text search
	        lat = results_array[0].geometry.location.lat()
        	lng = results_array[0].geometry.location.lng()
        	var loc = new google.maps.LatLng(lat, lng);

        	// Form Google Places request with location specified by lat/lng coordinates, a radius of 5 miles, and "Apartment" search query
			var request = {
				location: loc,
				radius: '5',
				query: "Apartment",
			};

			var service = new google.maps.places.PlacesService( document.getElementById( "map" ) );

			service.textSearch( request, function ( results, status ) {
				if ( status == google.maps.places.PlacesServiceStatus.OK ){

					// Iterate through each search result and get details for each apartment listing
					for( var i = 0; i < results.length; i++ ){

						// Set done to 1 when details have been gathered for each apartment listing
						var done;

						if ( i == ( results.length -1 ) ){
							done = 1;
						} else {
							done = 0;
						}
						me.getApartmentDetails( results[i], service, done, apartmentListModel, resultsController );				
					}
				}
			});
		} else {
		    alert( "Google Maps text search wasn't successful. Please try again later." );
		}
	});	
};

zipSearchController.prototype.getApartmentDetails = function ( results, service, done, resultsModel, resultsController ) {
	var me = this; 
	var done = done;
	var apartmentListModel = resultsModel;

	var request = {
		placeId: results.place_id
	};
	
	// Final object to be passed to the apartmentListModel which represents all details of a particular apartment listing
	var aptObject = {
				    	name: "Name",
				    	address: "Address",
				    	rating: "Average Rating",
				    	hours: "Office Hours",
				    	phone: "Phone",
				    	url: "URL"
	};

	aptObject.name = results.name;
	aptObject.address = results.formatted_address;

	getDetails();

	function getDetails() {
		service.getDetails( request, function ( results, status ) {
			if ( status == google.maps.places.PlacesServiceStatus.OK ){
				aptObject.url = results.website;
				me.updateApartmentListModel( aptObject, done, apartmentListModel, resultsController );
			}
			else {
				// Setting timeout to avoid hitting Google Places query limit
				setTimeout( function () {
					getDetails();
				}, 200 );			
			}		
		});
	};
};

zipSearchController.prototype.updateApartmentListModel = function ( apartment, done, resultsModel, resultsController ) {	
	resultsModel.addApartment( apartment.name, apartment.address, apartment.rating, apartment.hours, apartment.phone, apartment.url, done, resultsController );
};

var apartmentListController = function ( resultsView ) {
	this.resultsView = resultsView;
	return this;
};

apartmentListController.prototype.updateApartmentListView = function ( data ) {
	this.resultsView.render( data );
};

