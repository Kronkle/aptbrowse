/*
 * tableCell
 * type    =>  "item" || "heading" 
 * content =>
 */

 var tableCell = {

 	defaults: {
 		type: "item",
 		content: "",
 	}

 	heading: {
 		type: "heading",
 		content: "", //heading captions here
 	}

 	initializeItem: function() {
 		this.set({ "type": this.defaults.type });
 	}

 	initializeHeading: function() {
 		this.set({ "type": this.heading.type });
 	}

 };