/*
 * A model will represent the data for each 
 * apartment found when a search or load is run
 */

/* Each apartment model accepts an info hash that contains the name, address, 
average rating, hours, phone, and url details */
var apartment = function ( info ) {
	this.info = info;

	// TODO: Include an "isOpen variable" that will return true if office is currently open

	return this;
};

