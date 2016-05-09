/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// ReadReport Model
	// ----------
	WorkGadget.Model.ReadReportItems = function () {

		var query = "(to:daily_report_business2016@bizreach.co.jp OR to:rookie_2016@bizreach.co.jp) subject:新卒"
		WorkGadget.gApi.mail.list(query)
		.done(function(messageIDs){
			$.map(messageIDs, function(el, i){
				console.log(el);
				WorkGadget.gApi.mail.getMessage(el)
				.done(function(m){console.log(m)});
			})
		});

	}
})();
