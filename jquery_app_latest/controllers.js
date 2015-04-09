var zipSearchController = function () {

	return this;
};

zipSearchController.prototype.handleEvent = function () {
	
		var zip = document.getElementById("zipSearch").value;

		if (zip) {
			//U.S. zipcode validation - 5 digits or 5 digits followed by hyphen and 4 digits
			var regex = new RegExp(/(^\d{5}-\d{4}$)|(^\d{5}$)/)
			if (regex.test(zip)){
				//addDisplayRowsThroughSearch(zip);
				alert("Zip passed");
			} else {
				alert("Please enter a valid U.S. zipcode.");
				return;
			}
		}
};