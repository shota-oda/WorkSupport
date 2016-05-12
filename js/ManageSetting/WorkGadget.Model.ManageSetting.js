/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

/* 
 * setting IDs are below for easy access 
 * 1 ReportTemplate
 * 2 CaledarID
 * 
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
			 ,
		},

		initialize: function () {

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
			var setting = WorkGadget.Model.ManageSettingItem
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
			this.add(templateSet);
			this.add(calendarSet);
			templateSet.save()
			calendarSet.save()
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

		return settings;
	}

})();
