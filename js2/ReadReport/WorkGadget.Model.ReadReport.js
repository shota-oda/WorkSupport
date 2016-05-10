/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// ReadReport Model
	// ----------
	WorkGadget.Model.ReadReportItems = function () {

		var d = new $.Deferred();

		var query = "(to:daily_report_business2016@bizreach.co.jp OR to:rookie_2016@bizreach.co.jp) subject:新卒 after:2016/05/09 before:2016/05/10"
		
		var models = [];

		WorkGadget.gApi.mail.list(query)
		.done(function(messageIDs){

			$.each(messageIDs, function(){

				WorkGadget.gApi.mail.getMessage(this.id)
				.done(function(m){
					if(!m) return;
					
					//from
					var model = {autor:{}, content:{}};
					if(!m.payload.headers) return;
					$.each(m.payload.headers, function(){
						if (this.name == "From") {
							model.author = this.value;
							return false;
						}
					})
					//body
					if(!m.payload.parts) return;
					$.each(m.payload.parts, function(){
						if (this.mimeType == "text/plain"){
							model.content = base64_decode(this.body.data);
							return false;
						}
					})
					console.log(model);
					models.push(model);

				});
			});

			d.resolve(models);
		});
		return d;
	}
})();
