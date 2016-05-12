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
			toggleButton: "#ToggleButton",
			calendar: ".input-group.date",
			calendarInput: ".input-group.date input",
		},

		events: {
			"change @ui.calendarInput": "changeDate",
			"click @ui.toggleButton": "togglePanel",
		},

		collectionEvents: {
        	change: 'render'
    	},

		childView: WorkGadget.View.ReadReportItem,
		childViewContainer: '#ReportContainer',
		
		initialize: function (){
			this.bindUIElements();

			
		},

		templateHelpers: function(){
			return {
				 todayStr: function(){
				 	return WorkGadget.Common.fn.getYYYYMMDD(new Date())
				 }
				,
			}
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

			this.ui.calendar.datepicker({
			    todayBtn: "linked",
			    orientation: "bottom auto",
			    keyboardNavigation: false,
			    daysOfWeekDisabled: "0,6",
			    autoclose: true,
			    todayHighlight: true,
			    format: "yyyy/mm/dd",
			    endDate: "today",
			});
		},

		changeDate: function(){
			var $this = this;
			this.collection.reset()
			var date = this.ui.calendarInput.val()

			WorkGadget.Model.ReadReportItems(date, function (report){
				$this.collection.add(report);
			});
		},

		togglePanel: function(){
			var expand = "glyphicon-resize-full";
			var shrink = "glyphicon-resize-small";
			var $icon = this.ui.toggleButton.find("span");

			if ($icon.hasClass(expand)){
				//state is shrink, so change to Show
				$icon.removeClass(expand).addClass(shrink);
				$(this.childViewContainer + " .collapse").collapse("show");
			} else {
				//state is expand, so change to Hide
				$icon.removeClass(shrink).addClass(expand);
				$(this.childViewContainer + " .collapse").collapse("hide");
			}
			
		},

	});
})();
