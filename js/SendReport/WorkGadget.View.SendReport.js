/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Send Repoert View
	// ------------------
	WorkGadget.View.SendReport = Backbone.Marionette.ItemView.extend({

		template: '#template-SendReport',

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

		onShow: function(){
			
		},

		templateHelpers: function () {
			return {
				body: this.getBody()
			}
		},

		getBody: function (input) {
			return this.model.col1 + this.model.col2 + this.model.col3 + this.model.col4 + (input? input : '') + '\n\n' + '\n\n'
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
