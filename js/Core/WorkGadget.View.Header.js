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
			,
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

			$("#LeaveModal").modal({
				 show : false
				,
			});
			var self = this;
			$("#LeaveButton").on("click", function(){
				console.log("reserve");
				self.navToReserved();
			});
		},

		onShow : function(){
			//this.ui.LeaveModal.modal();
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
			this.ui.CollapseMenu.collapse("hide");
			Backbone.history.navigate(this.reservedHash, true);
		},

		shouldCheckLeave: function(hash){
			if (hash != "Send" && Backbone.history.getFragment() == "Send"){
				this.reservedHash = hash;
				$("#LeaveModal").modal('show');
				return true;
			}
			return false;
		},

		navToSend: function(){
			if (this.shouldCheckLeave('Send')) return;
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate('Send', true);
		},

		navToRead: function(){
			if (this.shouldCheckLeave('Read')) return;
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate('Read', true);
		},

		navToSetting: function(){
			if (this.shouldCheckLeave('Setting')) return;
			this.ui.CollapseMenu.collapse("hide")
			Backbone.history.navigate('Setting', true);
		},

		render: function () {
			/* thru */
		}
	});
})();
