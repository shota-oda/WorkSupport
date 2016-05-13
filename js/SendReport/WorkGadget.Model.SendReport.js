/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};
	
	// IMPL SendReport Model
	// ----------
	WorkGadget.Model.SendReport = Backbone.Model.extend({
		defaults: {
			 to:''
			,cc: ''
			,bcc: ''
			,subject: ''
			,col1: ''
			,col2: ''
			,col3: ''
			,col4: ''
			,input: ''
			,cal: {}//For Consistency, set Date to member
		},

		initialize: function () {
			this.cal = new Date();

			var settings = WorkGadget.Model.UserSettingList();
			
			this.set('subject', this.getSubject())
			this.set('to', settings.get(3).get("value"));
			this.set('cc', settings.get(4).get("value"));
			this.set('bcc', settings.get(5).get("value"))

			this.col1 = this.getColumn(1, '勤怠', this.getDateString() + '\n出勤:' + (this.isMonday() ? '08:30' : '09:30') + '\n退社:' + (this.isMonday() ? '17:30' : '18:30'));
			this.col2 = this.getColumnHeader(2, '本日の業務');
			this.col3 = this.getColumnHeader(3, '明日の業務と直近の主な完了予定');
			this.col4 = this.getColumnHeader(4, '本日の気づきと学び・明日への宣言');
			this.input = WorkGadget.Model.UserSettingList().get(0).get("value");

			//for use this in done callback
			var thisModel = this;

			WorkGadget.gApi.user.getName()
				.done(function (name) {
					thisModel.set("subject", thisModel.getSubject() + name);
				});

			var calIDs = WorkGadget.Model.UserSettingList().get(1).get("value");
			if(calIDs){
				var calIDs = calIDs.split(/\r\n|\r|\n/);
				WorkGadget.gApi.calendar.getTodayEvents(calIDs)
				.done(function (data){
					var taskListStr = data.reduce(function(p, c){
						return p + '\n' + c;
					});

					thisModel.col2 = thisModel.getColumn(2, "本日の業務", taskListStr);
					thisModel.trigger("change");
				});

				WorkGadget.gApi.calendar.getTommorrowEvents(calIDs)
				.done(function (data){
					var taskListStr = data.reduce(function(p, c){
						return p + '\n' + c;
					});

					thisModel.col3 = thisModel.getColumn(3, "明日の業務と直近の主な完了予定", taskListStr);
					thisModel.trigger("change");
				});
			}
		},

		updateTodayInsight: function (text) {
			this.set({col4: this.getColumn(4, '本日の気づきと学び', text)});
		},

		getSubject: function () {
			return '【新卒日報】' + this.getDateString();
		},

		getColumnHeader: function (colNum, colTitle) {
			return '───────────────────────────\n' + colNum + '）' + colTitle + '\n' + '───────────────────────────\n';
		},

		getColumn: function (colNum, colTitle, content) {
			return  this.getColumnHeader(colNum, colTitle) + content + '\n\n';
		},

		// -> YYYY/MM/DD(d)
		getDateString: function () {
			function getJaDay_Short(dayNum){
				switch(dayNum){
					case 0:
					return "日"
					case 1:
					return "月"
					case 2:
					return "火"
					case 3:
					return "水"
					case 4:
					return "木"
					case 5:
					return "金"
					case 6:
					return "土"
				}
			}
			return this.cal.getFullYear() + "/" + (this.cal.getMonth() + 1) + "/" + this.cal.getDate() + "(" + getJaDay_Short(this.cal.getDay()) + ")"
		},

		isMonday: function () {
			return this.cal.getDay() === 1;
		},
	});

})();
