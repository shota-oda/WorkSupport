/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};

function main () {
	'use strict';

	var $load = $("#LoadFrame");
	var $filter = $("#Filter");
	var $authButton = $("#AuthButton")

    WorkGadget.gApi.status.isLibraryReady = true
    WorkGadget.gApi.init()

    //silently check authed or not
    WorkGadget.Common.fn.DoAsync(WorkGadget.gApi.checkAuth(true, function(result) {
    	$load.hide();
    	if (result){
    		$filter.hide();
    	} else {
    		$authButton.on("click", function(){
    			WorkGadget.gApi.checkAuth(false, function(result) {
    				if (result){
    					$authButton.hide()
    					$filter.hide()
    			});
    		});
    		$authButton.show();
    	}
    }));


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