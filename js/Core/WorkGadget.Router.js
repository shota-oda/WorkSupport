/*global WorkGadget:true, Backbone, $ */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	// IMPL
	// Handles a single dynamic route to show
	// the active vs complete todo items
	WorkGadget.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			 '': 'SendReport',
			 'Send': 'SendReport',
			 'Read': 'ReadReport',
			 'Setting' : 'ManageSetting',
		}
	});

	// IMPL
	// Controller is just Object
	// For store routing inner logic
	WorkGadget.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			WorkGadget.App.View.Header = new WorkGadget.View.Header();
			var self = this;
			$(window).on("beforeunload", function() {
				if (self.showRemoveAlert){
					return self.removeAlertMessage;
				}
	  	});
		},

		showRemoveAlert : false,
		removeAlertMessage : "",


		ObserveHash: function(){
			WorkGadget.App.View.Header.navTo(Backbone.history.getFragment());
			this.showRemoveAlert = false;
		},

		SetRemoveAlert : function(mes){
			this.showRemoveAlert = true;
			this.removeAlertMessage = mes;
		},

		SendReport: function(){
			this.ObserveHash();
			this.SetRemoveAlert("Are you sure?\nDid you send or save message?");

			var content = new WorkGadget.View.SendReport({
						model: new WorkGadget.Model.SendReport()
					})

			WorkGadget.App.View.Root.showChildView('main', content);
		},

		ReadReport: function(){
			this.ObserveHash();

			var reports = new Backbone.Collection();
			var content = new WorkGadget.View.ReadReport({collection : reports})
			WorkGadget.Model.ReadReportItems(new Date(), function (report){
				reports.add(report);
			});

			WorkGadget.App.View.Root.showChildView('main', content);
		},

		ManageSetting: function(){
			this.ObserveHash();

			var content = new WorkGadget.View.ManageSettings({
				 collection: WorkGadget.Model.UserSettingList()
				,
			});

			WorkGadget.App.View.Root.showChildView('main', content);
		},

 	});

})();
