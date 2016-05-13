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
			'click @ui.preview': 'onPreviewClick',
		},

		modelEvents: {
			'change': 'render',
		},

		initialize: function () {
			
		},

		templateHelpers: function(){
			return {
				 inputTemplate: this.model.input
				,body: this.getBody()
			}
		},

		getBody: function () {
			return this.model.col1 + this.model.col2 + this.model.col3 + this.model.col4 + this.model.input + '\n\n';
		},

		onInputKeyUp: function () {
			this.model.input = this.ui.input.val()
			this.ui.preview.text(this.getBody());
		},

		onSendClick: function() {
			var header = {
				 To: this.model.to
				,Cc: this.model.cc
				,Bcc: this.model.bcc
			}
			console.log(this.ui.preview.val())
			// WorkGadget.gApi.mail.send(
			// 	 header
			// 	,this.model.subject
			// 	,this.ui.preview.val())	
		},

		onResetClick: function() {
			console.log("click2")
		},

		onPreviewClick: function(e){
			
			var $e = $(e.target)
			console.log($e.prop("tagName"))

			if(!($e.prop("tagName") == "TEXTAREA") && !$e.hasClass('on')){
			   //to edit mode
			    $e
			    .addClass('on')
			    .html('<textarea class="form-control" rows="10">'+$e.text()+'</textarea>');
			    //focus on
			    $e
			    .find("textarea")
			    .focus()
			    .blur(function(){
			        var inputVal = $(this).val();
			        //replace default value
			        if(inputVal===''){
			            inputVal = this.defaultValue;
			        };
			        //when edit is done
			        $(this).parent().removeClass('on').text(inputVal);
			    });
			};
		},
	});
})();
