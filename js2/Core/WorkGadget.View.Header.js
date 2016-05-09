/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};
(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};
	WorkGadget.View.Header = Backbone.Marionette.View.extend({
		
		//nav buttons
		ui: {
			 SendReport: "#SendReport"
			,ReadReport: "#ReadReport"
		},

		events: {
			 "click @ui.SendReport": "navToSend"
			,"click @ui.ReadReport": "navToRead"
		},

		initialize: function(){
		},

		navToSend: function(){
			this.ui.ReadReport.removeClass("active");

			this.ui.SendReport.addClass("active");

			Backbone.history.navigate('Send', true);
		},

		navToRead: function(){
			this.ui.SendReport.removeClass("active");

			this.ui.ReadReport.addClass("active");

			Backbone.history.navigate('Read', true);
		}
	});
})();



