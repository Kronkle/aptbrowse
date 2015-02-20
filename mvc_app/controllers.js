/*
 * Handle logic for page setup and "Add Apartment" 
 * button that the view builds 
 */

var addTableController = function() {
	return this;
};

addTableController.prototype.loadView = function () {
	var model = new addTable();
	var view = new addTableView(model);
	view.render();
};

var buttonPanelController = function() {
	return this;
};

buttonPanelController.prototype.loadView = function () {
	var model = new buttonPanel();
	var view = new buttonPanelView();
	view.render();
};

var displayRowController = function() {
	return this;
};

displayRowController.prototype.loadView = function () {
	var model = new displayRow();
	var view = new displayRowView(model);
	view.render();
};