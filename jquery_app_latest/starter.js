/*
 * Basic use case:
 * User zip search via zip view -> zip controller -> aptModel -> aptController -> aptView
*/

function init() {
	var searchController = new zipSearchController;
	var searchModel = new zipSearchModel;
	var resultsModel = new apartmentListModel;
	var resultsController = new apartmentListController;	
	var resultsView = new apartmentListView( resultsModel, resultsController );
	var searchView = new zipSearchView( searchModel, searchController, resultsModel );
};

init();
