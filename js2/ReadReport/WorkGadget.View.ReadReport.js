/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Read Repoert View
	// ------------------
	WorkGadget.View.ReadReportItem = Backbone.Marionette.ItemView.extend({
		
		template: '#template-ReadReportItem',

	})

	WorkGadget.View.ReadReport = Backbone.Marionette.CompositeView.extend({
		
		template: '#template-ReadReport',

		ui: {
			calendar: ".input-group.date > input",
			calendarButton: ".input-group.date button"
		},

		events: {
			"change @ui.calendar": "changeDate",
			"click @ui.calendarButton": "showCalendar"
		},

		childView: WorkGadget.View.ReadReportItem,
		childViewContainer: '#ReportContainer',
		
		initialize: function (){
			this.bindUIElements();

			this.setCalendar();
		},

		setCalendar: function(){
			
			this.ui.calendar.datepicker({
			    language: "ja",
			    format: 'mm/dd/yyyy',
			});

		},

		showCalendar: function(){
			this.ui.calendar.datepicker("show");
		},
	});
})();
