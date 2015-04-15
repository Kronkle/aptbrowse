/* 
*  Two views will be presented for now: a view for rendering the search bar and a view
*  for displaying the search results.
*/

var zipSearchView = function ( zipSearchModel, zipSearchController, resultsModel ) {
	var apartmentListModel = resultsModel;
	//console.log("Yo: ", apartmentListModel);
	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipSearch=document.getElementById("zipSearchBtn");
	zipSearch.addEventListener( "click", function ( ) {
		zipSearchController.handleEvent( apartmentListModel );
	});

	return this;
};

var apartmentListView = function () {
	return this;
};

apartmentListView.render = function () {

};