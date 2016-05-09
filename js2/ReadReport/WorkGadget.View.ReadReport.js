/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Read Repoert View
	// ------------------
	WorkGadget.View.ReadReportItem = Backbone.Marionette.ItemView.extend({
		template: '#template-ReadReportItem',

		modelEvents: {
			'change': 'render',
		},

	})

	WorkGadget.View.ReadReport = Backbone.Marionette.CompositeView.extend({
		
		itemView: FooItemView,
		itemViewContainer: '#ReportContainer',
		template: '#template-ReadReport',

		initialize: function () {
			
		},

		templateHelpers: function () {
			
		},

	
	});
})();
