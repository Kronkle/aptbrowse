/*
 * Views for add table and display rows
 */

var addTableView = function(model) {
	this.model = model;
	return this;
};

addTableView.prototype.render = function () {
	//Build table headings
	var atable_headings = ["Name","Address","Monthly Rent","Amenities","Pet-Friendly"];
	for(var x = 0; x < 5; x++){
		//At first, create base elements for the table
		if(x === 0){
			var add_table=document.createElement("table");
			add_table.className="table table-bordered";
			var tableBody=document.createElement("tbody");
			var tableHeadingRow=document.createElement("tr");
			var tableInputRow=document.createElement("tr");
		}

		//Create a "th" element for each column
		var instance_table_heading=document.createElement("th");
				
		//Create an HTML "td" element to store input fields on second table row
		var instance_table_data=document.createElement("td");
			
		//Create an HTML text element with the appropriate heading
		var textnode=document.createTextNode(atable_headings[x]);
				
		//Create HTML input field elements for each category
		var instance_input_field=document.createElement("input");
		instance_input_field.type="text";
				
		//Allow only 250 chars for now
		instance_input_field.maxLength="250";
				
		//Name each input field to collect data from later
		instance_input_field.id="text" + x.toString();
			
		//Append the HTML text element to the HTML "th" element
		instance_table_heading.appendChild(textnode);
		
		//Append the HTML input field element to the "td" element on the second row
		instance_table_data.appendChild(instance_input_field);
		
		//Append the HTML "th" element to the table row
		tableHeadingRow.appendChild(instance_table_heading);
				
		//Append the HTML "td" element to the second table row
		tableInputRow.appendChild(instance_table_data);
		
		//At the end of generating the table, append the new table rows to the table body
		if(x === 4){
			tableBody.appendChild(tableHeadingRow);
			tableBody.appendChild(tableInputRow);
			add_table.appendChild(tableBody);
		}
	}
	var atablebody = document.getElementById("aform");
	atablebody.appendChild(add_table);
};

var buttonPanelView = function ( model ) {
	this.model = model;	
	return this;
};

buttonPanelView.prototype.render = function () {
	//Create "Add Apartment" button to submit a new player entry
	var submit=document.createElement("input");
	submit.type="button";
				
	submit.value="Add Apartment";
	submit.className="center-block";

	submit.onclick=function(){
		addDisplayRow();
	};

	//Create "Add Apartment" input form for manual apartment info
	var add_apt_section=document.getElementById("aform");

	//Set form attributes
	add_apt_section.method="post";

	var ftablebody = document.getElementById("intro");
	ftablebody.appendChild(submit);

};

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

