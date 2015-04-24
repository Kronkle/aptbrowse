/* 
*  Two views will be presented for now: a view for rendering the search bar and a view
*  for displaying the search results.
*/

var zipSearchView = function ( zipSearchModel, zipSearchController, resultsModel, resultsController ) {
	var apartmentListModel = resultsModel;
	
	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipSearch=document.getElementById("zipSearchBtn");
	zipSearch.addEventListener( "click", function ( ) {
		zipSearchController.handleEvent( apartmentListModel, resultsController );
	});

	return this;
};

var apartmentListView = function () {
	return this;
};

apartmentListView.prototype.render = function ( data ) {
	$(document).ready(function(){

		// Remove searchbar and the break element below
		$("#search").html("");
		$("#break").html("");

		// Populate search results table
		$("#ftablebody").html(data);
	});
};