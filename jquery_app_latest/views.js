/* 
*  Two views will be presented for now: a view for rendering the search bar and a view
*  for displaying the search results.
*/

var zipSearchView = function ( zipSearchModel, zipSearchController ) {
	
	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipSearch=document.getElementById("zipSearchBtn");
	zipSearch.addEventListener( "click", function () {
		zipSearchController.handleEvent( "click" );
	});

	return this;
};

var apartmentListView = function () {
	return this;
};

apartmentListView.render = function () {
	
};