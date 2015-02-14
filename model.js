/*
 * Models for the add button, add table cells, and display table cells
 * 
 * 
 */

var addButton = {

	defaults: {
		type="button";
 		value="Add Apartment";
		className="center-block";
	}

	initialize: function() {
		this.set({"src": this.defaults.src});
	}

};

 var addTableCell = {

 	initializeValue: function(value) {
 		this.set({ "value": value });
 	}

 	initializeHeading: function(value) {
 		this.set({ "value": value });
 	}

 };


function displayCellModel (data) {
	this.data = data;
}

displayCellModel.prototype.create = function(cell_text){
	this.data = cell_text;
};

 var displayTableCell = {

 	initializeValue: function(value) {
 		this.set({ "value": value});
 	}

 };


