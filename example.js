/*
 * Dynamic table builder
 * - For now, just organizes fantasy football information that I manually input.
 */
"use strict";

//Create an introductory section for the app
var intro_section_setup = {

	build_intro_section: function(){

	//Get the first div in the html body to append introductory material to
	var intro_section=document.getElementById("intro");

	//Create text for an intro paragraph and the 'p' element to hold that text
	var intro_paragraph_text_node=document.createTextNode("Manually enter player information in the table below.");
	var intro_paragraph_element=document.createElement("p");

	//Append the intro paragraph to the intro 'p' element
	intro_paragraph_element.appendChild(intro_paragraph_text_node);

	//Append the 'p' element to the div
	intro_section.appendChild(intro_paragraph_element);

	},
	
};

//Create an 'Add Player' section for the app
var add_player_section_setup = {

	build_add_player_section: function(){

		//Get the form with id "aform" in the html body to append add player table to
		var add_player_section=document.getElementById("aform");

		//Set form attributes
		add_player_section.method="post";

		//Build table headings
		var atable_headings = ["Name","Position","Team","College","Age"];
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
			
			//Allow room for Michael Hoomanawanui
			instance_input_field.maxLength="50";
			
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
	
			//At the end of generating the table, append the 
			if(x === 4){
				//Append the new table rows to the table body
				tableBody.appendChild(tableHeadingRow);
				tableBody.appendChild(tableInputRow);
		
				add_table.appendChild(tableBody);
				
				//Create "Add Player" button to submit a new player entry
				var submit=document.createElement("input");
				submit.type="button";
				//submit.onclick="submitPlayer()";
				submit.value="Add Player";
				submit.className="center-block";
				
				//When submit button is clicked, send out inputted data
				submit.onclick=function(){
					//Set up AJAX request with inputted data
					var submitRequest = new XMLHttpRequest();
					var text0 = document.getElementById("text0").value;
					var text1 = document.getElementById("text1").value;
					var text2 = document.getElementById("text2").value;
					var text3 = document.getElementById("text3").value;
					var text4 = document.getElementById("text4").value;
				
					var data = "text0=" + text0 + "&" + "text1=" + text1 + "&" + "text2=" + text2 + "&" + "text3=" + text3 + "&" + "text4=" + text4;
					//alert("This shouldn't go off until Add Player button is clicked\n" + data);
					//Open the request, set the header, and send the data
					submitRequest.open('POST', 'submit.php', true);
					submitRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					submitRequest.send(data);
						
					//After the data has been sanitized, display on the HTML page within ftable
					submitRequest.onreadystatechange = display_data;
					function display_data() {
						if (submitRequest.readyState == 4) {
						 if(submitRequest.status == 200) {
							var ftablebody=document.getElementById("ftablebody");
							var newRow = ftablebody.insertRow(-1);
							newRow.innerHTML = submitRequest.responseText;
						    //alert('Success! Here is the response text:\n' + submitRequest.responseText);
							
							//document.getElementById("ftablebody").innerHTML = submitRequest.responseText;
						 } else {
							alert('Problem with request');
							
						 }
						}
						
					}
				
				};
				var pageBreaks=document.createElement("br");
				add_player_section.appendChild(add_table);
				add_player_section.appendChild(submit);
				add_player_section.appendChild(pageBreaks);
				
			}
		}		
	},
	
};


//Create a final table object for storing and displaying players
var ftable = {

	//Basic table scheme: name, dimensions, and column names
	name: "Table 1",
	rowNum: 10,
	colNum: 5,
	cols: ["Name", "Position", "Team", "College", "Age"],

	//Dyanmic table attributes: current position of index (y), total number of players, default player for testing
	index: 0,
	totalPlayers: 0,
	defaultPlayer: ["Mike Kronk", "Punter", "Kronky Kongs", "UNC", 22],

	//Simply shows the table name for now - there may not be a use case for this function
	showInfo: function(){
		alert(ftable.name);
	},

	/* 
	 * Create an objectof arrays that contains player info
	 *
	 */
	playerGroup: {},

	// Take inputted information for a new player and append it in a new row to the table
	takePlayer: function(player){


		//First, take the HTML document's table, which has an id of "ftable"
		var ftable = document.getElementById("ftable");
		ftable.style.tableLayout="fixed";
		ftable.style.overflow="hidden";
		ftable.style.whiteSpace="nowrap";
		//ftable.width="0px";
		
		var ftableBody = document.getElementById("ftablebody");
		
		//Create a new row, which will be the "tr" HTML element
		var tableRow=document.createElement("tr");
		

		//Append the new table row to the table body
		ftableBody.appendChild(tableRow);
		
		//Initialize new array in the playerGroup object if undefined (should always be the case, so always using just the '[]')
		this.playerGroup[this.index] = this.playerGroup[this.index] || []; 

		//Iterate through each column, adding all relevant info for the new table row
		for(var x = 0; x < 5; x++){

			this.playerGroup[this.index].push(player.stats[x]);

			//Create an HTML "td" element to store the player's info at index,y
			var node=document.createElement("td");
			node.style.overflow="hidden";
			node.style.whiteSpace="nowrap";

			//Create an HTML text element with the players
			var textnode=document.createTextNode(player.stats[x]);

			//Append the HTML text element to the HTML "td" element
			node.appendChild(textnode);

			//Append the HTML "td" element to the table row. So player text > "td" > "tr" > ftable
			tableRow.appendChild(node);

			//Debug code, so we know stuff is being fed in properly
			//alert("Placing " +  player.stats[x] + " at " + this.index + "," + x);
			
		}

		//Increment the index so when the next player is added, we are in the correct position in playerGroup
		this.index++;

		this.totalPlayers++;
		//alert("Total players is now: " + this.totalPlayers);
		
	},
	
	//Debug prints for looking at the structure of the playerGroup object 
	printTable: function(){
		alert(this.playerGroup);
		console.log(this.playerGroup);
	}
};

//Show general info about table
//ftable.showInfo();

//Build intro section
intro_section_setup.build_intro_section();

//First, display add table
add_player_section_setup.build_add_player_section();

//Manually input players into the table here:
ftable.takePlayer({
	stats: ["Kronk", "Punter", "Kronky Kongs", "UNC", 23]
	});
	
ftable.takePlayer({
	
	stats: ["Kronk2", "Punter2", "Kronky Kongs2", "UNC2", 20]
	});

ftable.takePlayer({
	
	stats: ["Kronk3", "Punter3", "Kronky Kongs3", "UNC3", 28]
	});

//ftable.printTable();


/*
* V0.1 Goals:
* Have a manually created object that contains info for a football table
* Football table has 10 rows and 5 columns
* The rows will represent a player and his characteristics
* The columns will represent player names, positions, teams, colleges, and age
* Column headers will be an array
* 
* There will be a table function that takes in a new player
* The HTML doc will contain a form where you can input players to activate 
* takePlayer function (you can also still manually call that here).
*/