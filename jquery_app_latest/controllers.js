/*
 * Current app functionality:  Populate form (zip search), Save form, Load form, Clear form, Admin Init DB, Admin Clear DB
 * Corresponding controllers: resultsController, adminController
*/



var zipSearchController = function () {
	return this;
};

zipSearchController.prototype.handleEvent = function () {
	
		var zip = document.getElementById("zipSearch").value;

		if (zip) {
			//U.S. zipcode validation - 5 digits or 5 digits followed by hyphen and 4 digits
			var regex = new RegExp(/(^\d{5}-\d{4}$)|(^\d{5}$)/)
			if (regex.test(zip)){
				//addDisplayRowsThroughSearch(zip);
				alert("Zip passed");
				this.zipSearch(zip);
			} else {
				alert("Please enter a valid U.S. zipcode.");
				return;
			}
		}
};

//Use this function to submit a Google places search for apartments in the zipcode
zipSearchController.prototype.zipSearch = function (zip) {

	//Convert user zipcode into lat/lng coordinates for google places text search
	var geocoder = new google.maps.Geocoder();
	var address = zip;
	var lat = '';
	var lng = '';
	var me = this;

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
						//Get results details here:
						me.getApartmentDetails(results[i], service, done);				
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
zipSearchController.prototype.getApartmentDetails = function ( results, service, done ) {
	var me = this; 
	var done = done;

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
				me.updateApartmentListModel(aptObject, done);
				//me.initialZipSearchViews(apartment, details, done);
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
zipSearchController.prototype.updateApartmentListModel = function ( apartment, done ) {

};

//Used to update UI with list of apartments
var apartmentListController = function ( ) {
	return this;
};

apartmentListController.prototype.handleEvent = function ( ) {
	alert("alc has listened");
};

//Pass new apartment list to apartment list view 
apartmentListController.prototype.updateApartmentListView = function ( ) {

};

