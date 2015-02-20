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
	controller.loadView();
};

createAddTable();

addButtonPanel();

