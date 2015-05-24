
/*
 *  Zipcode search workflow:
 *  User search via zipSearchView -> zipSearchController -> apartmentListModel -> apartmentListController -> apartmentListView
 */

function init() {	

	// Processes user zipcode searches entered into zipSearchView and updates apartmentListModel
	var searchController = new zipSearchController;

	// Models additional information about zipcode searches
	var searchModel = new zipSearchModel;
	
	// Models a list of apartment results from user zipcode searches
	var resultsModel = new apartmentListModel;

	// Renders list of apartments from apartmentListModel
	var resultsView = new apartmentListView;

	// Notifies apartmentListView of changes to the aparmentListModel
	var resultsController = new apartmentListController( resultsView );	

	// Renders zipcode searchbar
	var searchView = new zipSearchView( searchModel, searchController, resultsModel, resultsController );
};

init();
