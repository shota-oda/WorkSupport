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
			calendar: ".input-group.date",
			cal2: ".input-group.datepicker"
		},

		childView: WorkGadget.View.ReadReportItem,
		childViewContainer: '#ReportContainer',
		
		initialize: function (){
			this.bindUIElements();

			this.setCalendar();
		},

		setCalendar: function(){
			this.ui.cal2.datepicker({
			    todayBtn: "linked",
			    language: "ja",
			    orientation: "bottom auto",
			    keyboardNavigation: false,
			    daysOfWeekDisabled: "0,6",
			    autoclose: true,
			    todayHighlight: true
			});

			this.ui.calendar.datepicker({
			    todayBtn: "linked",
			    language: "ja",
			    orientation: "bottom auto",
			    keyboardNavigation: false,
			    daysOfWeekDisabled: "0,6",
			    autoclose: true,
			    todayHighlight: true
			});

		},
	});
})();
