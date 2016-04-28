/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Daily Repoert View
	// ------------------
	WorkGadget.View.DailyReport = {};

	WorkGadget.View.DailyReport = Backbone.Marionette.ItemView.extend({

		template: '#template-DailyReport',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			input: '#Report-Content',
			send: '#Report-Send',
			reset:'#Report-Reset',
			preview: '#Report-Preview',
		},

		events: {
			'keyup @ui.input': 'onInputKeyUp',
			'click @ui.send': 'onSendClick',
			'click @ui.reset': 'onResetClick',
		},

		modelEvents: {
			'change': 'render',
		},

		initialize: function () {
			
		},

		templateHelpers: function () {
			return {
				body: this.getBody()
			}
		},

		getBody: function (input) {
			return this.model.col1 + this.model.col2 + this.model.col3 + this.model.col4 + (input? input : '') + '\n\n' + this.model.col5 + '\n\n'
		},

		onInputKeyUp: function (e) {
			var input = this.ui.input.val()
			this.ui.preview.text(this.getBody(input));
		},

		onSendClick: function() {
			console.log("click")
		},

		onResetClick: function () {
			console.log("click2")
		}
	});
})();
