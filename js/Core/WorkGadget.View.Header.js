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
			,ManageSetting: "#ManageSetting"
			,CollapseMenu: "#MenuCollapse"
			,LeaveModal: "#LeaveModal"
			,LeaveButton: "#LeaveButton"
		},

		events: {
			  "click @ui.SendReport": "navToSend"
			 ,"click @ui.ReadReport": "navToRead"
			 ,"click @ui.ManageSetting": "navToSetting"
			 ,"click @ui.LeaveButton": "navToReserved"
		},

		reservedHash: "",

		//Attaching a view to an existing element is the exception.
		//The normal view lifecycle involves calling render, and without doing that there would be nothing for the UI elements to bind to.
		//so call this.bindUIElements() in your initialize method when need to attach a view to an existing element.
		initialize: function(){
			this.bindUIElements();
		},

		onShow : function(){
			this.ui.LeaveModal.modal();
		},

		navTo: function(hash){
			this.$("li.active").toggleClass("active", false);
			if (hash == "Send"){
				this.ui.SendReport.toggleClass("active", true);
			} else if (hash == "Read"){
				this.ui.ReadReport.toggleClass("active", true);
			} else if (hash == "Setting"){
				this.ui.ManageSetting.toggleClass("active", true);
			}
		},

		navToReserved: function(){
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate(this.reservedHash, true);
		},

		shouldCheckLeave: function(hash){
			if (Backbone.history.getFragment() == "Send"){
				this.reservedHash = hash;
				this.ui.LeaveModal.modal(show);
				return true;
			}
			return false;
		},

		navToSend: function(){
			if (shouldCheckLeave('Send')) return;
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate('Send', true);
		},

		navToRead: function(){
			if (shouldCheckLeave('Read')) return;
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate('Read', true);
		},

		navToSetting: function(){
			if (shouldCheckLeave('Setting')) return;
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate('Setting', true);
		},

		render: function () {
			/* thru */
		}
	});
})();
