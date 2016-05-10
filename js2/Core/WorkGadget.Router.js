/*global WorkGadget:true, Backbone, $ */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	// Handles a single dynamic route to show
	// the active vs complete todo items
	WorkGadget.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			 '': 'SendReport',
			 'Send': 'SendReport',
			 'Read': 'ReadReport'
		}
	});
	
	// Controller is just Object
	// For store routing inner logic
	WorkGadget.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			WorkGadget.App.View.Header = new WorkGadget.View.Header();
			WorkGadget.App.View.Instance = WorkGadget.App.View.Instance || {}
		},

		SendReport: function(){
			var content = new WorkGadget.View.SendReport({
						model: new WorkGadget.Model.SendReport()
					})

			WorkGadget.App.View.Root.showChildView('main', content);
		},

		ReadReport: function(){
			WorkGadget.Model.ReadReportItems()
			.done(function (data) {
				console.log(data);
				var content = new WorkGadget.View.ReadReport({
						collection:  new Backbone.Collection(data)
					})
			
				WorkGadget.App.View.Root.showChildView('main', content);
			})
		}

 	});
})();
