/*
 * Dynamic table builder
 * - For now, just organizes fantasy football information that I manually input.
 */
"use strict";

//Introduce the user to the app
alert("Dynamic table builder - V0.1");

//Create a table object for storing football player info using object literal notation
var table = {

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
		alert(table.name);
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

		//Create a new row, which will be the "tr" HTML element
		var tableRow=document.createElement("tr");

		//Append the new table row to the table
		ftable.appendChild(tableRow);

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
			alert("Placing " +  player.stats[x] + " at " + this.index + "," + x);
			
		}

		//Incrementthe index so when the next player is added, we are in the correct position in playerGroup
		this.index++;

		this.totalPlayers++;
		alert("Total players is now: " + this.totalPlayers);
		
	},
	printTable: function(){
		alert(this.playerGroup);
		console.log(this.playerGroup);
		/* Append HTML to the page here.
		 * Make sure the HTML first includes the cols array
		 * Then for each player that exists (i could be totalPlayers.length),
		 * Add a row for that player with their characteristics
		*/
	}
};

//Show general info about table
table.showInfo();

//Manually input players into the table here:
table.takePlayer({
	stats: ["Kronk", "Punter", "Kronky Kongs", "UNC", 23]
	});
	
table.takePlayer({
	
	stats: ["Kronk2", "Punter2", "Kronky Kongs2", "UNC2", 20]
	});

table.takePlayer({
	
	stats: ["Kronk3", "Punter3", "Kronky Kongs3", "UNC3", 28]
	});

table.printTable();


/*
* V0.1 Goals:
* Have a manually created object that contains info for a football table
* Football table has 10 rows and 5 columns
* The rows will represent a player and his characteristics
* The columns will represent player names, positions, teams, colleges, and age
* Column headers will be an array
* 
* There will be a table function that takes in a new playeer
* The HTML doc will contain a form where you can input players to activate 
* takePlayer function (you can also still manually call that here).
*/