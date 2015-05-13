/*
 *  Zipcode search workflow:
 *  User search via zipSearchView -> zipSearchController -> apartmentListModel -> apartmentListController -> apartmentListView
 */

function init() {	

	var searchController = new zipSearchController;
	var searchModel = new zipSearchModel;

	var resultsModel = new apartmentListModel;

	var resultsView = new apartmentListView;
	var resultsController = new apartmentListController( resultsView );	

	var searchView = new zipSearchView( searchModel, searchController, resultsModel, resultsController );
};

init();
