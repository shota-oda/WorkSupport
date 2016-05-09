/*global WorkGadget:true, Backbone, $ */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	// Handles a single dynamic route to show
	// the active vs complete todo items
	WorkGadget.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			 '': 'DailyReport',
			 'Send': 'DailyReport',
			 'Read': 'ReadReport'
		}
	});
	
	WorkGadget.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			var header = new WorkGadget.View.Header();

			//WorkGadget.App.View.Root.showChildView('header', header);
		},

		DailyReport: function(){
			var review = new WorkGadget.View.DailyReport({
				model: new WorkGadget.Model.DailyReport()
			})

			WorkGadget.App.View.Root.showChildView('main', review);
		},

		ReadReport: function(){
			console.log("aaa");
		}

 	});
})();
