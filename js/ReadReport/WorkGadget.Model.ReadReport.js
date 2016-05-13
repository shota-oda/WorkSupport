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

		/**/
		var query = "(to:daily_report_business2016@bizreach.co.jp OR to:rookie_2016@bizreach.co.jp) subject:新卒 after:$ad before:$bd"
			.replace("$ad", WorkGadget.Common.fn.getYYYYMMDD(from))
			.replace("$bd", WorkGadget.Common.fn.getYYYYMMDD(to));
		
		var models = [];

		WorkGadget.gApi.mail.list(query)
		.done(function(messageIDs){
			//create serial id for toggle
			var index = 0;
			//for trim signature
			var signForTrim = "--------------------------------------------------";
			
			$.each(messageIDs, function(){

				WorkGadget.gApi.mail.getMessage(this.id)
				.done(function(m){
					
					if(!m || m.error){
						//TODO error
						console.log("error")
						if (m.error) console.log(m.error);
						return;
					} else if (!m.payload || !m.payload.headers){
						//TODO no content
						console.log("no content\nresponse:\n")
						console.log(m);
						return;
					}
					
					var model = {
						author:{}, 
						content:{}, 
						cid: "c-" + index, 
						lid: "l-" + index
					};
					index++;

					//author
					$.each(m.payload.headers, function(){
						if (this.name == "From") {
							model.author = this.value;
							return false;
						}
					});

					//content
					//plain text is stored at payload > body
					//rich content is stored 
					//①at payload > parts[] > body
					//②at payload > parts[] > parts[] > body

					if (m.payload.body.size > 0){
						model.content = base64_decode(m.payload.body.data)
					} else {
						$.each(m.payload.parts, function(){
							if (this.mimeType == "text/plain"){
								model.content = base64_decode(this.body.data);
								return false;
							} else if (this.mimeType == "multipart/alternative"){
								$.each(this.parts, function(){
									if (this.mimeType == "text/plain"){
										model.content = base64_decode(this.body.data);
										return false;
									}
								})
								return false;
							}
						});
					}
					// trimming signature
					// if there's trimSign, do trim
					var trimIndex = model.content.indexOf(signForTrim);
					if (trimIndex > 0){
						model.content = model.content.substring(0, trimIndex);	
					}
					
					callback(model);
				});
			})
		});
	}


})();
