/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};
(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};
	WorkGadget.View.Header = Backbone.Marionette.View.extend({
		
		//attach static html elments not reference/template
		el: $("#Header"),

		//nav buttons
		ui: {
			 SendReport: "#SendReport"
			,ReadReport: "#ReadReport"
		},

		events: {
			  "click @ui.SendReport": "navToSend"
			 ,"click @ui.ReadReport": "navToRead"
		},

		navToSend: function(){
			this.$("li.active").toggleClass("active", false);
			this.ui.SendReport.toggleClass("active", true);

			Backbone.history.navigate('Send', true);
		},

		navToRead: function(){
			this.$("li.active").toggleClass("active", false);
			this.ui.ReadReport.toggleClass("active", true);

			Backbone.history.navigate('Read', true);
		},

		render: function () {
			/* thru */
		}
	});
})();



