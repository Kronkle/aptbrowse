/*
 * Handle logic for "Add Apartment" button that the view builds
 *
 */

 var displayRowController = function() {
 	return this;
 };

 displayRowController.prototype.loadView = function () {
 	var model = new displayRow();

 	var view = new displayRowView(model);

 	view.render();

 };