 /* 
  *  apartmentListModel - Accepts apartment entries from search results and generates relevant HTML to pass to apartmentListView
  *  zipSearchModel     - Will store zipcode searches and place zipcodes used frequently into a special list  
  */

var apartmentListModel = function () {	
	this.apartmentList = {};
	return this;
};

apartmentListModel.prototype.addApartment = function ( name, address, rating, hours, phone, url, done, resultsController ) {
	var key = name;

	// Create new entry for apartment from search results
	this.apartmentList[ key ] = {
		"Name":    key,
		"Address": address,
		"Rating":  rating,
		"Hours":   hours,
		"Phone":   phone,
		"URL":     url
	};

	// Once all of the apartments from the search results have been added to apartmentList, generate HTML and update database (TODO)
	if ( done ) {
           this.updateDatabase( this.apartmentList, resultsController );
	}
};

apartmentListModel.prototype.updateDatabase = function ( apartmentList, resultsController ) {

    // Convert apartmentList to a JSON string for AJAX call
    var jsonApartmentList = JSON.stringify( apartmentList ) ;
 
	var request = new XMLHttpRequest();

	$.ajax({
		method: "POST",
		url: "pushApartments.php",
		data: jsonApartmentList,
		success: function ( data ) {
			// Call controller to update view with generated HTML
			resultsController.updateApartmentListView( data );
		},
		error: function () {
			alert( "Problem with request" );
		}
	});
};

var zipSearchModel = function ( ) {
    this.searchesList = {};
    this.frequentSearches = {};
	return this;
};