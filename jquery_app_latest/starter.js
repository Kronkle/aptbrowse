function init() {
	var searchController = new zipSearchController;
	var searchModel = new zipSearchModel;
	var searchView = new zipSearchView( searchModel, searchController );

	var resultsController = new apartmentListController;
	var resultsModel = new apartmentListModel;
	var resultsView = new apartmentListView( resultsModel, resultsController );
};

init();
