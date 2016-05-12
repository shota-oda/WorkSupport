/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// Setting Model
	// ----------
	WorkGadget.Model.ManageSettingItem = Backbone.Model.extend({
		defaults: {
			  key:""
			 ,value:{}
			 ,id: {}
			 ,
		},

		initialize: function () {

		},

		
	});

	// Setting Collection
	// ----------
	WorkGadget.Model.ManageSettings = Backbone.Collection.extend({

		model: WorkGadget.Model.ManageSettingItem,

		localStorage: new Backbone.LocalStorage("Model.ManageSettings"),

		comparator: "id",

		initialize: function () {
			var thisCollection = this;
			
			thisCollection.fetch()
			.done(function(){
				if (thisCollection.length){
					thisCollection.setDefaultData();
				}
			})
			thisCollection.forEach(function(model){
				console.log("Model in collection: " + model.get("content"));
			})
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

})();
