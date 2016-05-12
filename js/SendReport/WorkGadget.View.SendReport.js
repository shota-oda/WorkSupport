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
				 inputTemplate: this.model.inputTemplate
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
			console.log(e);

			// $('dd').click(function(){
	  //      		//classでonを持っているかチェック
			// 	if(!$(this).hasClass('on')){
			// 	    //編集可能時はclassでonをつける
			// 	    $(this).addClass('on');
			// 	    var txt = $(this).text();
			// 	    //テキストをinputのvalueに入れてで置き換え
			// 	    $(this).html('<input type="text" value="'+txt+'" />');
			// 	    //同時にinputにフォーカスをする
			// 	    $('dd > input').focus().blur(function(){
			// 	        var inputVal = $(this).val();
			// 	        //もし空欄だったら空欄にする前の内容に戻す
			// 	        if(inputVal===''){
			// 	            inputVal = this.defaultValue;
			// 	        };
			// 	        //編集が終わったらtextで置き換える
			// 	        $(this).parent().removeClass('on').text(inputVal);
			// 	    });
			// 	};
			// });
		},
	});
})();
