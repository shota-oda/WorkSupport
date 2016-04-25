/*global WorkGadget:true, Backbone, $ */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	// Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	// Marionette.Controller is deprecate, instead use Marionette.Object
	WorkGadget.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			
		},

		DailyReport: function(){
			var review = new WorkGadget.View.DailyReport({
				model: new WorkGadget.Model.DailyReport()
			})
		},
 	});
})();
