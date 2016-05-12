/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Manage Setting Collection and Template View
	// ------------------
	WorkGadget.View.SettingItem = Backbone.Marionette.ItemView.extend({

		template: '#template-ManageSettingItem',

		ui: {
			updateButton: ".update",
			resetButton: ".reset",
			input: ".input"
		},

		events: {
			"click @ui.updateButton": "update",
			"click @ui.resetButton": "reset",
		},



		update: function(){

		},

		reset: function(){

		},

	});



	//Manage Setting Collection and Template View
	// ------------------
	WorkGadget.View.ManageSettings = Backbone.Marionette.CompositeView.extend({

		template: '#template-ManageSetting',

		childView: WorkGadget.View.SettingItem,
		childViewContainer: '#SettingContainer',


	});
})();
