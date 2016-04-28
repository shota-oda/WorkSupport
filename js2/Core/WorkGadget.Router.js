/*global WorkGadget:true, Backbone, $ */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	// Handles a single dynamic route to show
	// the active vs complete todo items
	WorkGadget.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			 '': 'DailyReport'
		}
	});
	
	WorkGadget.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			
		},

		DailyReport: function(){
			var review = new WorkGadget.View.DailyReport({
				model: new WorkGadget.Model.DailyReport()
			})

			WorkGadget.App.View.Root.showChildView('main', review);
		},

 	});
})();
