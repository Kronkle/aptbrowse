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
	var apartmentList = {};

	return this;
};

apartmentListModel.prototype.addApartment = function ( name, address, rating, hours, phone, url ) {
	var key = name;

	this.apartmentList.key = {
		"Address": address,
		"Rating":  rating,
		"Hours":   hours,
		"Phone":   phone,
		"URL":     url
	};
};
