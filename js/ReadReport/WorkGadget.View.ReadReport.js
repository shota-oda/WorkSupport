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
			calendarInput: ".input-group.date input",
		},

		events: {
			"change @ui.calendarInput": "changeDate",
		},

		collectionEvents: {
        	change: 'render'
    	},

		childView: WorkGadget.View.ReadReportItem,
		childViewContainer: '#ReportContainer',
		
		initialize: function (){
			this.bindUIElements();

			
		},

		onShow: function () {
	        // Invoke the datetimepicker plugin
      	 	this.setCalendar();
	    },

		onClose: function () {
        	// Destroy the datetimepicker plugin
        	this.ui.calendar.datepicker('destroy');
    	},

		setCalendar: function(){
			var yesterDay = new Date();
			yesterDay.setDate(yesterDay.getDate() - 1);
			
			this.ui.calendar.datepicker({
			    todayBtn: "linked",
			    orientation: "bottom auto",
			    keyboardNavigation: false,
			    daysOfWeekDisabled: "0,6",
			    autoclose: true,
			    todayHighlight: true,
			    format: "yyyy/mm/dd",
			    maxDate: yesterDay,
			});
		},

		changeDate: function(){
			var $this = this;
			console.log(this.collection)
			this.collection.reset()
			var date = this.ui.calendarInput.val()

			WorkGadget.Model.ReadReportItems(date, function (report){
				$this.collection.add(report);
			});
		}

	});
})();
