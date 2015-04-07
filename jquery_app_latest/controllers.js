var searchController = function() {
	return this;
};

searchController.prototype.setSearch = function () {
	var zipSearch = new zipSearchView();
	zipSearch.render();

}


