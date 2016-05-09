/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Read Repoert View
	// ------------------
	WorkGadget.View.ReadReport = Backbone.Marionette.ItemView.extend({

		template: '#template-ReadReport',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			,
		},

		events: {
			,
		},

		modelEvents: {
			'change': 'render',
		},

		initialize: function () {
			
		},

		templateHelpers: function () {
			
		},

	
	});
})();
