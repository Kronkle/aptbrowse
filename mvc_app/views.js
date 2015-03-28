/*
 * Views for add table and display rows
 */

var addTableView = function(model) {
	this.model = model;
	return this;
};

addTableView.prototype.render = function () {
	//Build table headings
	var atable_headings = ["Name","Address", "Average Rating", "Office Hours","Phone","Website"];
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
	submit.className="btn btn-primary bg-silver black";

	//Create "Add Apartment" input form for manual apartment info
	var add_apt_section=document.getElementById("aform");

	//Set form attributes
	add_apt_section.method="post";

	submit.onclick=function(){
		//Call a function that opens a bootstrap dialog box here instead of using the UI form
		addDisplayRow();
		add_apt_section.reset();
	};

	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipsearch=document.createElement("input");
	zipsearch.type="button";

	zipsearch.value="Zip Code Search";
	zipsearch.className="btn btn-primary bg-silver black";

	zipsearch.onclick=function(){
		var zip = prompt("Zipcode:");

		if (zip) {
			//U.S. zipcode validation - 5 digits or 5 digits followed by hyphen and 4 digits
			var regex = new RegExp(/(^\d{5}-\d{4}$)|(^\d{5}$)/)
			if (regex.test(zip)){
				addDisplayRowsThroughSearch(zip);
			} else {
				alert("Please enter a valid U.S. zipcode.");
				return;
			}
		}
	};

	//Create "Clear Entries" button for clearing the table
	var clearEntries=document.createElement("input");
	clearEntries.type="button";

	clearEntries.value="Clear Entries";
	clearEntries.className="btn btn-primary bg-silver black";

	clearEntries.onclick=function(){
		clearDisplayRows();
	};

	// "Save Entry" button for saving current table output
	var saveEntry=document.createElement("input");
	saveEntry.type="button";

	saveEntry.value="Save Entry";
	saveEntry.className="btn btn-primary bg-silver black";

	saveEntry.onclick=function(){
		var pass = prompt("Please enter a password to access these results later");
		
		if(pass){
			if(document.getElementById("ftablebody").childNodes.length){
				saveState(pass);
			} else {
				alert("There's nothing here to save.");
			}
		}
	};

	// "Load Entry" button for rendering previous table output

	var loadEntry=document.createElement("input");
	loadEntry.type="button";

	loadEntry.value="Load Entry";
	loadEntry.className="btn btn-primary bg-silver black";

	loadEntry.onclick=function(){
		var pass = prompt("Enter your results password");
		if(pass) {
			loadState(pass);
		}
	};

	// "Init DB" button for temporary testing, only to be used once

	var initBtn=document.createElement("input");
	initBtn.type="button";

	initBtn.value="Init Save/Load DB";
	initBtn.className="btn btn-primary bg-silver black";

	initBtn.onclick=function(){
		initDB();
	};

	// "Clear DB" button for temporary testing

	var clearBtn=document.createElement("input");
	clearBtn.type="button";

	clearBtn.value="Clear DB";
	clearBtn.className="btn btn-primary bg-silver black";

	clearBtn.onclick=function(){
		alert("Database will be cleared here");
		clearDB();
	};

	var ftablebody = document.getElementById("buttonPanel");
	ftablebody.appendChild(submit);
	ftablebody.appendChild(zipsearch);
	ftablebody.appendChild(clearEntries);
	ftablebody.appendChild(saveEntry);
	ftablebody.appendChild(loadEntry);
	ftablebody.appendChild(initBtn);
	ftablebody.appendChild(clearBtn);

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

displayRowView.prototype.renderLoadedRows = function ( model ) {
	var ftablebody=document.getElementById("ftablebody");
	ftablebody.innerHTML=(this.model.fields);
};