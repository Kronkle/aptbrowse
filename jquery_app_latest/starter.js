function initZipSearch() {
	var controller = new zipSearchController;
	var model = new zipSearchModel;
	var view = new zipSearchView( model, controller );
	
};

function initApartmentList() {
	var controller = new apartmentListController;
	var model = new apartmentListModel();
	var view = new apartmentListView( model, controller, );
};

initZipSearch();

initApartmentList();