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

	function appStart(){
		
		$load.show();

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

		WorkGadget.gApi.loadSubClients()
			.done(function () {
				WorkGadget.gApi.mail.init();
				WorkGadget.gApi.calendar.init();
				WorkGadget.App.start();
				$load.hide();
				$filter.hide();
			});
	}

    //silently check authed or not
    WorkGadget.Common.fn.DoAsync(WorkGadget.gApi.checkAuth(true, function(result) {
    	$load.hide();
    	if (result){
    		appStart();
    	} else {
    		$authButton.on("click", function(){
    			WorkGadget.gApi.checkAuth(false, function(result) {
    				if (result){
    					$authButton.hide()
    					appStart();
    				}
	    		});
	    	});
	    	$authButton.show();
    	}
    }));


}