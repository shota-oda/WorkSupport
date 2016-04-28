/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};
	WorkGadget.View.Entry = {};

	WorkGadget.View.Entry = Backbone.Marionette.ItemView.extend({

		template: '#template-EntryFilter',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			authButton: '#Auth-Button',
		},

		events: {
			'click @ui.authButton': 'onAuthClick',
		},

		initialize: function () {
			this.delegateEvents(_.extend(this.events, {'click select': 'changeSelect'}));
		},

		onAuthClick: function () {

		},
	});
})();
