/*
 * Build heading table, add button, and an example first row for the user to see.
 *
 */

var displayRowView = function ( model ) {
	this.model = model;

	return this;
};

displayRowView.prototype.render = function () {

	var htmlRow = document.createElement("tr");

	//Will use a handlebars template here in the future
	//var html = '<tr><td>Data1</td><td>Data2</td><td>Data3</td></tr>';
	for(var i = 0; i < 3; i++){
		//Create filler text for each row field
		var text = "Data" + i.toString();
		var textNode = document.createTextNode(text);

		//Append filler text to each row field
		var td = document.createElement("td");
		td.appendChild(textNode);

		//Append row field to table row to be added
		htmlRow.appendChild(td);
	}

	var ftablebody = document.getElementById("ftablebody");
	ftablebody.appendChild(htmlRow);

};

