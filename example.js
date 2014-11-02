/*
 * Dynamic table builder
 * - For now, just organizes fantasy football information that I manually input.
 */
"use strict";

//Introduce the user to the app
//alert("Dynamic table builder - V0.1");

//Create a table object for adding players to the final table displayed
var atable = {

	buildTable: function(){
		//First, take the HTML document's add table, which has an id of "atable"
		var add_table = document.getElementById("atable");
	
		//Build table headings
		var atable_headings = ["Name","Pos","Team","College","Age"];
		for(var x = 0; x < 5; x++){
	
			//Create a new row, which will be the "tr" HTML element
			if(x === 0){
				var tableBody=document.createElement("tbody");
				var tableRow=document.createElement("tr");
			}
		
			//Create an HTML "td" element to store heading info
			var node=document.createElement("th");
		
			//Create an HTML text element with the appropriate heading
			var textnode=document.createTextNode(atable_headings[x]);
		
			//Append the HTML text element to the HTML "td" element
			node.appendChild(textnode);
		
			//Append the HTML "td" element to the table row
			tableRow.appendChild(node);
	
			//Append the new table row to the table body
			tableBody.appendChild(tableRow);
		
			//At the end of generating the table, append the 
			if(x === 4){
				add_table.appendChild(tableBody);
			}
		}
	},
}

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

//First, display add table
atable.buildTable();

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