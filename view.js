/*
 * Build heading table, add button, and an example first row for the user to see.
 *
 */

 var createAddButtonView = function ( addButton ) {

 	var div = document.createElement("div"),
 		buttonEl = document.createElement("input");
 	
	div.appendChild(buttonEl);

	var render = function () {
		//Use handlebars template to generate rest of HTML for button
		buttonEl.innerHTML = template({
			src: addButton.getSrc()
		});
	};
 };

 var createAddTableView = function ( addTableCell ) {

 	this.model = addTableCell;

 	return this;

 };


 createAddTableView.prototype.output = function () {

 	var tableOutput = '';

 };

