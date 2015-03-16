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
				radius: '10',
				query: "Apartment",
			};

			var service = new google.maps.places.PlacesService(document.getElementById('map'));
			service.textSearch(request, function (results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK){
					console.log(results);
					for(var i = 0; i < results.length; i++){
						//Start passing i here to a function that can notify when results are completely recorded
						var done;
						if (i == (results.length -1)){
							done = 1;
						}
						else {
							done = 0;
						}
						me.detailedZipSearchViews(results[i], service, done);					
					}
				}
			});
		    	}
		else {
		    alert("Request to google maps TEXT SEARCH wasn't successful. Please try again later.");
		    console.log(status);
		}
	});	
};

displayRowController.prototype.detailedZipSearchViews = function (apartment, googleServiceObj, done) {
	
	var me = this; 
	var done = done;

	var request = {
		placeId: apartment.place_id
	};
	
	var details = {
		website: "Website"
	};
	
	getDetails();

	function getDetails() {
		googleServiceObj.getDetails(request, function (results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK){
				console.log(results);
				details.website = results.website;
				me.initialZipSearchViews(apartment, details, done);
			}
			else {
				//Hitting OVER QUERY LIMIT at the moment with these calls
				setTimeout(function () {
					getDetails();
				}, 200);			
			}		
		});
	};
};

/* Use this function to provide filler data (for now) for all of the other fields.
   Later combine this with web scraper data */
 displayRowController.prototype.initialZipSearchViews = function (apartment, details, done) {
 	

 	//Set up AJAX request with inputted data
	var submitRequest = new XMLHttpRequest();
	var text0 = apartment.name;
	var text1 = apartment.formatted_address;
	var text2 = "Dummy";
	var text3 = "Dummy";
	var text4 = "Dummy";
	if (details.website == undefined){
		details.website = "Website not listed in Google Maps"
	}
	var text5 = details.website;

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

	if (done == 1) {
		alert("All results have been recorded");
	}

 };

displayRowController.prototype.loadView = function (data) {
	var fields = data;
	var model = new displayRow(fields);
	var view = new displayRowView(model);
	view.render(model);
};

var clearController = function() {
	return this;
};

clearController.prototype.clearEntries = function () {
	document.getElementById('ftablebody').innerHTML = "";
};

var stateController = function() {
	return this;
};

stateController.prototype.saveResults = function (pass) {

	//Set up AJAX request with inputted data
	var outputHTML = document.getElementById('output').innerHTML;
	alert("Output HTML is: " + outputHTML.length + " characters");
	var submitRequest = new XMLHttpRequest();
	var data = "output=" + outputHTML + "pass=" + pass;

	//Open the request, set the header, and send the data
	submitRequest.open('POST', 'save.php', true);
	submitRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	submitRequest.send(data);
		
	//After the data has been sanitized, display on the HTML page within ftable
	submitRequest.onreadystatechange = display_data;
	function display_data() {
		if (submitRequest.readyState == 4) {
			if(submitRequest.status == 200) {
				//data=submitRequest.responseText;
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};
};

stateController.prototype.initDB = function () {

var submitRequest = new XMLHttpRequest();

//Open the request, set the header, and send the data
	submitRequest.open('POST', 'init.php', true);
	submitRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	submitRequest.send();
		
	//After the data has been sanitized, display on the HTML page within ftable
	submitRequest.onreadystatechange = display_data;
	function display_data() {
		if (submitRequest.readyState == 4) {
			if(submitRequest.status == 200) {
				//data=submitRequest.responseText;
				alert("Success!");
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};


};