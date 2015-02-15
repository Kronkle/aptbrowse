function addRow() {
	var controller = new displayRowController;
	controller.loadView();
};


//Create "Add Apartment" button to submit a new player entry
var submit=document.createElement("input");
submit.type="button";
				
submit.value="Add Apartment";
submit.className="center-block";

submit.onclick=function(){
	addRow();
};

var ftablebody = document.getElementById("intro");
ftablebody.appendChild(submit);

//Will define an event listener here for clicking the Add Apartment button, which will call addRow