/*
 * Basic use case:
 * User zip search via zipSearch view -> zipSearch controller -> aptListModel -> aptListController -> aptListView
*/

function init() {	

	var searchController = new zipSearchController;
	var searchModel = new zipSearchModel;

	var resultsModel = new apartmentListModel;

	// These aren't currently used (see TODO in models.js)
	var resultsView = new apartmentListView;
	var resultsController = new apartmentListController( resultsView );	

	var searchView = new zipSearchView( searchModel, searchController, resultsModel, resultsController );
};

init();
