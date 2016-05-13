/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

/* 
 * setting IDs are below for easy access 
 * 1 ReportTemplate
 * 2 CaledarID
 * 3 to
 * 4 cc
 * 5 bcc
 *
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

		initialize: function(){

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

		setDefaultData: function(){
			var setting = WorkGadget.Model.UserSettingItem
			var templateSet = new setting({
				key: "ReportTemplateContent",
				value: "",
				id: 0
			});
			var calendarSet = new setting({
				key: "CalendarIDs",
				value: "",
				id: 1
			});
			var mailToSet = new setting({
				 key: "MailHeaderTo"
				,value: ""
				,id: 2
				,row: 3
			})
			var mailCcSet = new setting({
				 key: "MailHeaderCc"
				,value: ""
				,id: 3
				,row: 3
			})
			var mailBccSet = new setting({
				 key: "MailHeaderBcc"
				,value: ""
				,id: 4
				,row: 3
			})
			this.add(templateSet);
			this.add(calendarSet);
			this.add(mailToSet);
			this.add(mailCcSet);
			this.add(mailBccSet);
			
			templateSet.save()
			calendarSet.save()
			mailToSet.save()
			mailCcSet.save()
			mailBccSet.save()
		},
	});

	// FUNC Setting Collection
	// ----------
	WorkGadget.Model.UserSettingList = function(){
		var settings = new WorkGadget.Model.UserSettingCollection();
		
		//warn: fetch/save/get is async
		// 		now is sync because use localstorage 
		settings.fetch();

		if (settings.length === 0){
			settings.setDefaultData();
		}

		return settings
	}
})();
