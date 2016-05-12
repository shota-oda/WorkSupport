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

		templateHelpers: function () {
			return {
				 inputTemplate: this.model.input
				,body: this.getBody()
			}
		},

		getBody: function () {
			return this.model.col1 + this.model.col2 + this.model.col3 + this.model.col4 + this.model.input + '\n\n';
		},

		onInputKeyUp: function (e) {
			this.model.input = this.ui.input.val()
			this.ui.preview.text(this.getBody());
		},

		onSendClick: function() {
			console.log("click")
		},

		onResetClick: function() {
			console.log("click2")
		},

		onPreviewClick: function(e){
			console.log(e.toElement.hasClass('on'));
			console.log(e.toElement.show());
			console.log(e.currentTarget.hasClass('on'));
			
			var $e = e.currentTarget
			
			if(!$e.hasClass('on')){
			    //to edit mode
			    $e
			    .addClass('on');
			    .html('<textarea class="form-control" rows="10">'+$e.text()+'</textarea>');
			    //同時にinputにフォーカスをする
			    $e.find("textarea")
			    .focus()
			    .blur(function(){
			        var inputVal = $(this).val();
			        //もし空欄だったら空欄にする前の内容に戻す
			        if(inputVal===''){
			            inputVal = this.defaultValue;
			        };
			        //編集が終わったらtextで置き換える
			        $(this).parent().removeClass('on').text(inputVal);
			    });
			};
			
		},
	});
})();
