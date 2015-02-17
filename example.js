function createAddTable() {
	var controller = new addTableController;
	controller.loadView();
};

function addDisplayRow() {
	var controller = new displayRowController;
	controller.loadView();
};

createAddTable();

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

