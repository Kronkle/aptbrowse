/*
 * Build heading table, add button, and an example first row for the user to see.
 *
 */

var displayRowView = function ( model ) {
	this.model = model;

	return this;
};

displayRowView.prototype.render = function () {

	var html = '<tr><td>Data1</td><td>Data2</td><td>Data3</td></tr>';
	document.getElementById('ftablebody').innerHTML = html;

};

