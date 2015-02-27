function createAddTable() {
	var controller = new addTableController;
	controller.loadView();
};

function addButtonPanel() {
	var controller = new buttonPanelController;
	controller.loadView();
};

function addDisplayRow() {
	var controller = new displayRowController;
	controller.addApartment();
};

createAddTable();

addButtonPanel();

//Create a single displayRowController here, remove addDisplayRow (controllers.js)