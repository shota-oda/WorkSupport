/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';
	
	WorkGadget.App = new Backbone.Marionette.Application()
	
	// The Application Object is responsible for kicking off
	// a Marionette application when its start function is called
	//
	// This application has a singler root Layout that is attached
	// before it is started.  Other system components can listen
	// for the application start event, and perform initialization
	// on that event

	WorkGadget.App.on('before:start', function () {
		console.log("Phase: before Start")
		WorkGadget.App.View = {};
		WorkGadget.App.View.Root = new WorkGadget.View.RootLayoutView();
	});

	WorkGadget.App.on('start', function () {
		console.log("Phase: Start")

		var controller = new WorkGadget.Controller();
		controller.router = new WorkGadget.Router({
			controller: controller
		});

		Backbone.history.start();
	});

	WorkGadget.App.start();
})();
