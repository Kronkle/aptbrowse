/*
 * Views for add table and display rows
 */

var addTableView = function(model) {
	this.model = model;
	return this;
};

addTableView.prototype.render = function () {
	//Build table headings
	var atable_headings = ["Name","Address","Monthly Rent","Amenities","Pet-Friendly?","URL"];
	for(var x = 0; x < 6; x++) {
		//At first, create base elements for the table
		if(x === 0){
			var add_table=document.createElement("table");
			add_table.className="table";
			var tableBody=document.createElement("tbody");
			var tableHeadingRow=document.createElement("tr");
			var tableInputRow=document.createElement("tr");
		}

		//Create a "th" element for each column
		var instance_table_heading=document.createElement("th");
		instance_table_heading.style.textAlign="center";

		//Create an HTML "td" element to store input fields on second table row
		var instance_table_data=document.createElement("td");
		instance_table_data.style.textAlign="center";

		//Create an HTML text element with the appropriate heading
		var textnode=document.createTextNode(atable_headings[x]);
				
		//Create HTML input field elements for each category
		var instance_input_field=document.createElement("input");
		instance_input_field.type="text";
				
		//Allow only 250 chars for now
		instance_input_field.maxLength="40";
				
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
	//Create "Add Apartment" button to manually submit a new player entry
	var submit=document.createElement("input");
	submit.type="button";
				
	submit.value="Add Apartment";
	submit.className="btn btn-primary bg-silver black btn-block";

	//Create "Add Apartment" input form for manual apartment info
	var add_apt_section=document.getElementById("aform");

	//Set form attributes
	add_apt_section.method="post";

	submit.onclick=function(){
		addDisplayRow();
		add_apt_section.reset();
	};

	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipsearch=document.createElement("input");
	zipsearch.type="button";

	zipsearch.value="Zip Code Search";
	zipsearch.className="btn btn-primary bg-silver black btn-block";

	zipsearch.onclick=function(){
		var zip = prompt("Zipcode:");

		//Simple zipcode validation for now
		if (zip == "" || zip.length != 5){
			alert("Please enter a valid zipcode.");
			return;
		}

		addDisplayRowsThroughSearch(zip);
	};

	//Create "Clear Entries" button for clearing the table
	var clearEntries=document.createElement("input");
	clearEntries.type="button";

	clearEntries.value="Clear Entries";
	clearEntries.className="btn btn-primary bg-silver black btn-block";

	clearEntries.onclick=function(){
		clearDisplayRows();
	};

	var ftablebody = document.getElementById("buttonPanel");
	ftablebody.appendChild(submit);
	ftablebody.appendChild(zipsearch);
	ftablebody.appendChild(clearEntries);

	//Create line break for after button
	var lineBreak=document.createElement("br");
	ftablebody.appendChild(lineBreak);
};

var displayRowView = function ( model ) {
	this.model = model;
	return this;
};

displayRowView.prototype.render = function ( model ) {
	var htmlRow = document.createElement("tr");

	var ftablebody=document.getElementById("ftablebody");
	var newRow = ftablebody.insertRow(-1);
	newRow.innerHTML = this.model.fields;

	ftablebody.appendChild(newRow);
};

