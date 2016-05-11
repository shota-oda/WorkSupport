/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// ReadReport Model
	// ----------
	WorkGadget.Model.ReadReportItems = function (date,callback) {

		var from = new Date(date);
		var to = new Date(date)
		to.setDate(to.getDate() + 1);
		var query = "(to:daily_report_business2016@bizreach.co.jp OR to:rookie_2016@bizreach.co.jp) subject:新卒 after:$ad before:$bd"
			.replace("$ad", WorkGadget.Common.fn.getYYYYMMDD(from))
			.replace("$bd", WorkGadget.Common.fn.getYYYYMMDD(to));

		var models = [];

		WorkGadget.gApi.mail.list(query)
		.done(function(messageIDs){
			if(messageIDs.length === 0) return;
			$.each(messageIDs, function(){

				WorkGadget.gApi.mail.getMessage(this.id)
				.done(function(m){
					if(!m) return;
					
					var model = {author:{}, content:{}};

					//author
					$.each(m.payload.headers, function(){
						if (this.name == "From") {
							model.author = this.value;
							return false;
						}
					});

					//content
					if(!m.payload.parts) return;
					$.each(m.payload.parts, function(){
						if (this.mimeType == "text/plain"){
							model.content = base64_decode(this.body.data);
							return false;
						}
					});
					
					callback(model);
				});
			});
		});
	}
})();
