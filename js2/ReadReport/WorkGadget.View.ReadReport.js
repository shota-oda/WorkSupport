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
		},

		events: {
			"change @ui.calendar > input": "changeDate",
		},

		childView: WorkGadget.View.ReadReportItem,
		childViewContainer: '#ReportContainer',
		
		initialize: function (){
			this.bindUIElements();

			this.setCalendar();
		},

		setCalendar: function(){
			
			this.ui.calendar.datepicker({
			    todayBtn: "linked",
			    orientation: "bottom auto",
			    keyboardNavigation: false,
			    daysOfWeekDisabled: "0,6",
			    autoclose: true,
			    todayHighlight: true,
			    format: { 
			    	toDisplay: function(date, format, language) {
			    		var d = new Date(date);
			    		return d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate()
			    	},
        			toValue: function (date, format, language) {
			            var d = new Date(date);
			            return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
        			}
        		}
			});

		},

	});
})();
