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

		//Attaching a view to an existing element is the exception. 
		//The normal view lifecycle involves calling render, and without doing that there would be nothing for the UI elements to bind to.
		//so call this.bindUIElements() in your initialize method when need to attach a view to an existing element.
		initialize: function(){
			this.bindUIElements();
		},

		navTo: function(hash){
			this.$("li.active").toggleClass("active", false);
			if (hash == "Send"){
				this.ui.SendReport.toggleClass("active", true);
			} else if (hash == "Read"){
				this.ui.ReadReport.toggleClass("active", true);
			}
		},
		
		navToSend: function(){
			Backbone.history.navigate('Send', true);
		},

		navToRead: function(){
			Backbone.history.navigate('Read', true);
		},

		render: function () {
			/* thru */
		}
	});
})();



