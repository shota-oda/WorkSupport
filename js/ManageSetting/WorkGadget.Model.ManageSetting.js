/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

/*
 * setting IDs are below for easy access
 * 0 ReportTemplate
 * 1 ReportTemplateHead
 * 2 ReportTemplateFoot
 * 3 CaledarID
 * 4 to
 * 5 cc
 * 6 bcc
 * 7 subject
 */

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};

	// IMPL Setting Model
	// ----------
	WorkGadget.Model.UserSettingItem = Backbone.Model.extend({
		defaults: {
			  key:""
			 ,value:{}
			 ,id: {}
			 ,row: 10
		},
	});

	// IMPL Setting Collection
	// ----------
	WorkGadget.Model.UserSettingCollection = Backbone.Collection.extend({

		model: WorkGadget.Model.UserSettingItem,

		localStorage: new Backbone.LocalStorage("Model.ManageSettings"),

		comparator: "id",

		initialize: function () {
		},
	});

	// FUNC Setting Collection
	// ----------
	WorkGadget.Model.UserSettingList = function(){
		var settings = new WorkGadget.Model.UserSettingCollection();

		//warn: fetch/save/get is async
		// 		now is sync because use localstorage
		settings.fetch();

		var setting = WorkGadget.Model.UserSettingItem

		if (settings.length === 0){
			settings.reset();
		}

		if (settings.findWhere({key : "ReportTemplateHead"}).get("value") == undefined){
			var set = new setting({
				key: "ReportTemplateHead",
				value: "",
				id: 0,
				row:5,
			});
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "ReportTemplateFoot"}).get("value") == undefined){
			var set = new setting({
				key: "ReportTemplateFoot",
				value: "",
				id: 1,
				row:5,
			});
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "ReportTemplateContent"}).get("value") == undefined){
			var set = new setting({
				key: "ReportTemplateContent",
				value: "",
				id: 2,
			});
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "CalendarIDs"}).get("value") == undefined){
			var set = new setting({
				key: "CalendarIDs"
				,value: ""
				,id: 3
				,row: 3
			});
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "MailHeaderTo"}).get("value") == undefined){
			var set = new setting({
				 key: "MailHeaderTo"
				,value: ""
				,id: 4
				,row: 3
			})
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "MailHeaderCc"}).get("value") == undefined){
			var set = new setting({
				 key: "MailHeaderCc"
				,value: ""
				,id: 5
				,row: 3
			})
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "MailHeaderBcc"}).get("value") == undefined){
			var set = new setting({
				 key: "MailHeaderBcc"
				,value: ""
				,id: 6
				,row: 3
			})
			settings.add(set);
			set.save()
		}

		if (settings.findWhere({key : "MailSubject"}).get("value") == undefined){
			var set = new setting({
				key: "MailSubject"
			 ,value: ""
			 ,id: 7
			 ,row: 1
			})
			settings.add(set);
			set.save()
		}
		return settings
	}
})();
