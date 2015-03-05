/*
 * Handle logic for page setup and "Add Apartment" 
 * button that the view builds 
 */

var addTableController = function() {
	return this;
};

addTableController.prototype.loadView = function () {
	var model = new addTable();
	var view = new addTableView(model);
	view.render();
};

var buttonPanelController = function() {
	return this;
};

buttonPanelController.prototype.loadView = function () {
	var model = new buttonPanel();
	var view = new buttonPanelView();
	view.render();
};

var displayRowController = function() {
	return this;
};

//Make this the displayRowController event listener/handler that handles the "Add Apartment" onclick
//event passed to it by the buttonPanelView
displayRowController.prototype.addApartment = function () {
	//Set up AJAX request with inputted data
	var submitRequest = new XMLHttpRequest();
	var text0 = document.getElementById("text0").value;
	var text1 = document.getElementById("text1").value;
	var text2 = document.getElementById("text2").value;
	var text3 = document.getElementById("text3").value;
	var text4 = document.getElementById("text4").value;
	var text5 = document.getElementById("text4").value;

	//Validate that all input fields were filled in
	if (text0 == "" || text1 == "" || text2 == "" || text3 == "" || text4 == "" || text5 == ""){
		alert("Please fill in all of the information fields when adding a new apartment");
		return;
	}
	var data = "text0=" + text0 + "&" + "text1=" + text1 + "&" + "text2=" + text2 + "&" + "text3=" + text3 + "&" + "text4=" + text4 + "&" + "text5=" + text5;
	
	//Open the request, set the header, and send the data
	submitRequest.open('POST', 'submit.php', true);
	submitRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	submitRequest.send(data);
		
	//After the data has been sanitized, display on the HTML page within ftable
	submitRequest.onreadystatechange = display_data;
	function display_data() {
		if (submitRequest.readyState == 4) {
			if(submitRequest.status == 200) {
				data=submitRequest.responseText;
				var model = new displayRow(data);
				var view = new displayRowView(model);
				view.render(model);
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};
};

//Use this function to submit an initial Google places search for apartment names
displayRowController.prototype.zipSearch = function (zip) {

	//Convert user zipcode into location for google places request
	//this.zip = zip;
	var geocoder = new google.maps.Geocoder();
	var lat = '';
	var lng = '';

	var address = zip;
	alert("zip is " + address);

	/*geocoder.geocode({ 'address': address}, function(results, status ) {
		if (status == google.maps.GeocoderStatus.OK) {
			lat = results[0].geometry.location.lat();
			lng = results[0].geometry.location.lng();
		} else {
			alert("Geocode wasn't successful: " + status);
		}
	});*/

	// Include callback function since geocoder method works asynchronously
	geocoder.geocode( {'address': address},
	    function(results_array, status) { 
	        if (status == google.maps.GeocoderStatus.OK){
	        	lat = results_array[0].geometry.location.lat()
	        	lng = results_array[0].geometry.location.lng()
	        	alert('Lat: ' + lat + ' and Long: ' + lng);
	    	}
	    	else {
	    		alert("Geocode wasn't successful: " + status);
	    	}
	});

	//Setup a google places request
	/*
	var GooglePlaces = require("googleplaces");
	var googlePlaces = new GooglePlaces("AIzaSyC3UPlqEMvxkElc_Y3B6CLb_vObtHZWEcY", "json");
	var parameters =[];


	parameters = {
		
		query: "Apartments",

		
		//Include a maxprice setting for later
		//maxprice: Answer2.GoogleID,

		//Include a location and radius later (must include both together)
		//location: [35.921937, -78.881396]
		//radius: Answer3.GoogleID,		
	};
	var ourResponse = [];
	googlePlaces.textSearch(parameters, function (error, response) {
		if (error) throw error;
			console.log(response.results);
			ourResponse = response.results;
		});
	*/
};

/* Use this function to provide filler data (for now) for all of the other fields.
   Later combine this with web scraper data */
 displayRowController.prototype.prepareZipSearchViews = function () {

 };

//Use this function to display all display rows returned by the google search
displayRowController.prototype.loadZipSearchViews = function () {

};

displayRowController.prototype.loadView = function (data) {
	var fields = data;
	var model = new displayRow(fields);
	var view = new displayRowView(model);
	view.render(model);
};