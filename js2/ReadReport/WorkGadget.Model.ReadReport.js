/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// ReadReport Model
	// ----------
	WorkGadget.Model.ReadReportItems = function () {

		var query = "(to:daily_report_business2016@bizreach.co.jp OR to:rookie_2016@bizreach.co.jp) subject:新卒"
		
		var models = [];

		WorkGadget.gApi.mail.list(query)
		.done(function(messageIDs){
			$.each(messageIDs, function(el, i){

				WorkGadget.gApi.mail.getMessage(el.id)
				.done(function(m){
					//from
					var model = {};
					$.each(m.payload.headers, function(){
						if (this.name == "From") {
							model.author = this.value;
							return;
						}
					})
					//body
					$.each(m.payload.parts, function(){
						if (this.mimeType == "text/plain"){
							model.content = base64_decode(this.body.data);
							return;
						}
					})

					models.push(model);

				});
			})
		});

	}
})();
