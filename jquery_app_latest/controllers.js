/*
 * zipSearchController: Use user input to search
 * for apartments via the Google Places API,
 * update the model with results
 *
 * apartmentListController: Use apartment
 * information passed from the model to update
 * the view
*/

var zipSearchController = function () {
	return this;
};

zipSearchController.prototype.handleEvent = function ( resultsModel, resultsController ) {

		var apartmentListModel = resultsModel;
		
		var zip = document.getElementById("zipSearch").value;

		if (zip) {
			//U.S. zipcode validation - 5 digits or 5 digits followed by hyphen and 4 digits
			var regex = new RegExp(/(^\d{5}-\d{4}$)|(^\d{5}$)/)
			if (regex.test(zip)){							
				this.zipSearch(zip, resultsModel, resultsController);
				
				// Add loading spinner in place of the searchbar
				$("#search").html("<div id=\"spinnerCenter\" class=\"spinner\">Loading...</div>");

			} else {
				alert("Please enter a valid U.S. zipcode.");
				return;
			}
		}
};

zipSearchController.prototype.registerUser = function ( resultsModel, resultsController, username, password ) {
	alert("User will be registered here");
	alert(username);
	alert(password);


	//Set up AJAX request with inputted data
    var request = new XMLHttpRequest();

    var data = "username=" + username + "&" + "password=" + password;

	//Open the request, set the header, and send the data
	request.open('POST', 'register.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);
		
	//After the data has been sanitized, display on the HTML page within ftable
	request.onreadystatechange = display_data;
	function display_data() {
		if (request.readyState == 4) {
			if(request.status == 200) {
				var data=request.responseText;
				console.log(data);				
		 	} else {
				alert('Problem with registration request');	
		 	}
		}		
	};
};

//Use this function to submit a Google places search for apartments in the zipcode
zipSearchController.prototype.zipSearch = function (zip, resultsModel, resultsController) {

	//Convert user zipcode into lat/lng coordinates for google places text search
	var geocoder = new google.maps.Geocoder();
	var address = zip;
	var lat = '';
	var lng = '';
	var me = this;
	var apartmentListModel = resultsModel;

	// Include callback function since geocoder method works asynchronously
	geocoder.geocode( {'address': address}, function(results_array, status) { 
		if (status == google.maps.GeocoderStatus.OK){
	        
	        lat = results_array[0].geometry.location.lat()
        	lng = results_array[0].geometry.location.lng()
        	var loc = new google.maps.LatLng(lat, lng);

			var request = {
				location: loc,
				radius: '5',
				query: "Apartment",
			};

			var service = new google.maps.places.PlacesService(document.getElementById('map'));
			service.textSearch(request, function (results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK){
					console.log(results);
					//Iterate through each apartment result, get details, and update apartmentList model
					for(var i = 0; i < results.length; i++){
						//Start passing i here to a function that can notify when results are completely recorded
						var done;
						if (i == (results.length -1)){
							done = 1;
						}
						else {
							done = 0;
						}
						me.getApartmentDetails(results[i], service, done, apartmentListModel, resultsController);				
					}
					//If query is successful and results are available, update ApartmentList Model below:
				}
			});
		    	}
		else {
		    alert("Google Maps text search wasn't successful. Please try again later.");
		    console.log(status);
		}
	});	
};

//Get details for specific apartment object
zipSearchController.prototype.getApartmentDetails = function ( results, service, done, resultsModel, resultsController ) {
	var me = this; 
	var done = done;
	var apartmentListModel = resultsModel;

	var request = {
		placeId: results.place_id
	};
	
	//Final object to be passed to the apartmentList model
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
		service.getDetails(request, function (results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK){
				console.log(results);
				aptObject.url = results.website;
				me.updateApartmentListModel(aptObject, done, apartmentListModel, resultsController);
			}
			else {
				//Setting timeout to avoid hitting query limit
				setTimeout(function () {
					getDetails();
				}, 200);			
			}		
		});
	};
};

//Add apartment with details to apartment list model
zipSearchController.prototype.updateApartmentListModel = function ( apartment, done, resultsModel, resultsController ) {	
	resultsModel.addApartment(apartment.name, apartment.address, apartment.rating, apartment.hours, apartment.phone, apartment.url, done, resultsController);
};

//Accept a resultsView for displaying search results
var apartmentListController = function ( resultsView ) {
	this.resultsView = resultsView;
	return this;
};

//Render search results via resultsView 
apartmentListController.prototype.updateApartmentListView = function ( data ) {
	this.resultsView.render( data );
};

