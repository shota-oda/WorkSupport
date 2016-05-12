/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// SendReport Model
	// ----------

	WorkGadget.Model.Setting = Backbone.Model.extend({
		defaults: {
			  key:""
			 ,value:{}
			 ,id: 0
			 ,
		},

		initialize: function () {

		},

		
	});

	WorkGadget.Model.SettingList = Backbone.Collection.extend({

		model: WorkGadget.Model.Setting,

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
				value: [],
				id: 1
			}))
		},

		
	});

})();
