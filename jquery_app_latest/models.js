/*
 * There will be one model to represent the search bar and one model for the resulting apartment list
 * 
 */

var zipSearchModel = function () {
	// Frequent searches list will be maintained here
	return this;
};

/* Each apartment model accepts an info hash that contains the name, address, 
average rating, hours, phone, and url details */
var apartmentListModel = function ( ) {	
	this.apartmentList = {};
	return this;
};

apartmentListModel.prototype.addApartment = function ( name, address, rating, hours, phone, url, done, resultsController ) {
	var key = name;

	this.apartmentList[key] = {
		"Name":    key,
		"Address": address,
		"Rating":  rating,
		"Hours":   hours,
		"Phone":   phone,
		"URL":     url
	};
	//console.log(this.apartmentList);

	//For now, only one push to the database is intended with all of the search results for one zipcode
	if ( done ) {
		this.updateDatabase(this.apartmentList, resultsController);
	}
};

apartmentListModel.prototype.updateDatabase = function ( apartmentList, resultsController ) {

    //Set up AJAX request with inputted data
    var jsonApartmentList = JSON.stringify(apartmentList);
 
	var request = new XMLHttpRequest();

	//Open the request, set the header, and send the data
	request.open('POST', 'pushApartments.php', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jsonApartmentList);
		
	//After the data has been sanitized, display on the HTML page within ftable
	request.onreadystatechange = display_data;
	function display_data() {
		if (request.readyState == 4) {
			if(request.status == 200) {
				var data=request.responseText;
				console.log(data);	

				//Call controller to update view with new model details
				//TODO: Add a handler for resultsController to pick up here
				resultsController.updateApartmentListView( data );
				
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};
};
