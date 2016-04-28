/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};

function main () {
	'use strict';

	$("#LoadFrame").hide();

	var $filter = $("#filter");

    WorkGadget.gApi.status.isLibraryReady = true
    WorkGadget.gApi.init()

    //silently check authed or not
    WorkGadget.Common.fn.DoAsync(WorkGadget.gApi.checkAuth(true, function(result) {
    	if (result){
    		$filter.hide();
    	} else {

    	}
    });


    WorkGadget.App = new Backbone.Marionette.Application()
	
	WorkGadget.App.on('before:start', function () {

		WorkGadget.App.View = {};
		WorkGadget.App.View.Root = new WorkGadget.View.RootLayoutView();
	});

	WorkGadget.App.on('start', function () {
		
		var controller = new WorkGadget.Controller();
		controller.router = new WorkGadget.Router({
			controller: controller
		});

		Backbone.history.start();
	});

	WorkGadget.App.start();
}