/*
 * Handle logic for page setup and "Add Apartment" 
 * button that the view builds 
 */

var addTableController = function() {
	return this;
};

addTableController.prototype.loadView = function () {
	var model = new addTable();
	var view = new addTableView(model);
	view.render();
};

var buttonPanelController = function() {
	return this;
};

buttonPanelController.prototype.loadView = function () {
	var model = new buttonPanel();
	var view = new buttonPanelView();
	view.render();
};

var displayRowController = function() {
	return this;
};

displayRowController.prototype.addApartment = function () {
	//Set up AJAX request with inputted data
	var submitRequest = new XMLHttpRequest();
	var text0 = document.getElementById("text0").value;
	var text1 = document.getElementById("text1").value;
	var text2 = document.getElementById("text2").value;
	var text3 = document.getElementById("text3").value;
	var text4 = document.getElementById("text4").value;

	var data = "text0=" + text0 + "&" + "text1=" + text1 + "&" + "text2=" + text2 + "&" + "text3=" + text3 + "&" + "text4=" + text4;
	
	//Open the request, set the header, and send the data
	submitRequest.open('POST', 'submit.php', true);
	submitRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	submitRequest.send(data);
		
	//After the data has been sanitized, display on the HTML page within ftable
	submitRequest.onreadystatechange = display_data;
	function display_data() {
		if (submitRequest.readyState == 4) {
			if(submitRequest.status == 200) {
				data=submitRequest.responseText;
				alert(data);
				var model = new displayRow(data);
				var view = new displayRowView(model);
				view.render(model);

				//var ftablebody=document.getElementById("ftablebody");
				//var newRow = ftablebody.insertRow(-1);
				//newRow.innerHTML = submitRequest.responseText;
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};
};

displayRowController.prototype.loadView = function (data) {
	//hardcode fields for now, will be user input like in basic app later
	/*var fields = [
		"Waterstone", 
		"10700 Nelson Ct", 
		"$1100", 
		"Gym, Clubhouse", 
		"True"
	];*/
	var fields = data;
	alert(fields);
	var model = new displayRow(fields);
	var view = new displayRowView(model);
	view.render(model);
};