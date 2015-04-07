var zipSearchView = function () {
	return this;
};

zipSearchView.prototype.render = function () {
	//Create "Zip Code Search" button for auto-filling table with searches via Google Maps
	var zipsearch=document.getElementById("zipSearchBtn");

	zipsearch.onclick=function(){
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
}