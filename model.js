/*
 * 
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

 var displayTableCell = {

 	initializeValue: function(value) {
 		this.set({ "value": value});
 	}

 };

