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
			 ,id: 0
			 ,
		},

		initialize: function () {

		},

		
	});

	// Setting Collection
	// ----------
	WorkGadget.Model.ManageSettings = Backbone.Collection.extend({

		model: WorkGadget.Model.ManageSettingItem,

		localStorage: new Backbone.LocalStorage('Model.SettingList'),

		comparator: "id",

		initialize: function () {
			var thisCollection = this;

			thisCollection.fetch()
			.done(function(){
				if (thisCollection.length){
					thisCollection.add(thisCollection.getDefaultData())
				}
			})
		},

		getDefaultData: function(){
			var setting = WorkGadget.Model.Setting
			var settings = [];

			settings.add(new setting({
				key: "ReportTemplateContent",
				value: "",
				id: 0
			}));
			settings.add(new setting({
				key: "CalendarIDs",
				value: "",
				id: 1
			}))
		},

		
	});

})();
