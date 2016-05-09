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
		},

		start: function () {
			this.view = new WorkGadget.View.Header();
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
