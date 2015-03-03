/*
 * Model for add table and the rows that are created when 
 * user clicks "Add Apartment"
 */

var addTable = function ( ) {
	return this;
};

var buttonPanel = function ( ) {
	return this;
};

/* For now, simply keeps the column information for display rows. This model's
info will be used in future views later */
var displayRow = function ( fields ) {
	this.fields = fields;
	return this;
};

