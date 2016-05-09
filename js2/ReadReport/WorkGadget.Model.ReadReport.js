/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// ReadReport Model
	// ----------
	WorkGadget.Model.ReadReport = Backbone.Model.extend({
		defaults: {
			to:'',
			cc: '',
			subject: '',
			col1: '',
			col2: '',
			col3: '',
			col4: '',
			col5: '',
			cal: {},//For Consistency, set Date() to member
		},

		initialize: function () {
			
		},

		
	});

})();
