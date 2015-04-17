/*
 * There will be one model to represent the search bar and one model for the resulting apartment list
 * 
 */

var zipSearchModel = function ( ) {
	return this;
};

/* Each apartment model accepts an info hash that contains the name, address, 
average rating, hours, phone, and url details */
var apartmentListModel = function ( ) {	
	this.apartmentList = {};
	return this;
};

apartmentListModel.prototype.addApartment = function ( name, address, rating, hours, phone, url, done ) {
	var key = name;

	this.apartmentList[key] = {
		"Address": address,
		"Rating":  rating,
		"Hours":   hours,
		"Phone":   phone,
		"URL":     url
	};
	console.log(this.apartmentList);

	//For now, only one push to the database is intended with all of the search results for one zipcode
	if ( done ) {
		this.updateDatabase(this.apartmentList);
	}
};

apartmentListModel.prototype.updateDatabase = function ( apartmentList ) {

    //Set up AJAX request with inputted data
	var submitRequest = new XMLHttpRequest();
	var text0 = apartment.name;
	var text1 = apartment.formatted_address;
	var text2 = "Avg. Rating";
	var text3 = "Office Hours";
	var text4 = "Phone #";
	if (details.website == undefined){
		details.website = "Website not listed in Google Maps"
	}
	var text5 = details.website;

	//Validate that all input fields were filled in
	if (text0 == "" || text1 == "" || text2 == "" || text3 == "" || text4 == "" || text5 == ""){
		alert("Please fill in all of the information fields when adding a new apartment");
		return;
	}

	var data = "text0=" + text0 + "&" + "text1=" + text1 + "&" + "text2=" + text2 + "&" + "text3=" + text3 + "&" + "text4=" + text4 + "&" + "text5=" + text5;
	
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
				//var model = new displayRow(data);
				//var view = new displayRowView(model);
				//view.render(model);
		 	} else {
				alert('Problem with request');	
		 	}
		}		
	};

	//Call controller to update view with new model details
	apartmentListController.prototype.updateApartmentListView();
};
