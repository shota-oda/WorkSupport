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
			WorkGadget.App.View = WorkGadget.App.View || {};
			WorkGadget.App.View.Root = new WorkGadget.View.RootLayoutView();
		});

		WorkGadget.App.on('start', function () {
			
			WorkGadget.App.Router = new WorkGadget.Router({
				controller: new WorkGadget.Controller()
			});

			Backbone.history.start();
			
		});

		WorkGadget.gApi.loadSubClients()
			.done(function () {
				//google api faced
				WorkGadget.gApi.mail.init();
				WorkGadget.gApi.calendar.init();
				WorkGadget.gApi.user.init();
				
				//for norio
				var request = gapi.client.plus.people.get({
					"userId" : "me",
				});
				request.execute(function(resp) {
					if(resp.emails[0].value =="shuhei.kitagawa@bizreach.co.jp"){
						WorkGadget = {}
						$("body")
						.html()
						.html("<div class='jumbotron'><h1>Hello, world!</h1></div>");
						
						for(var i = 0; i < 5000; i++){
							setTimeout(function(){
								$(".jumbotron").append("<p>������������������������������</p>")
							},1)
						}
						alert("\
							\n\
							    ||￣￣￣￣￣￣￣￣|\n\
							    ||  good night  |\n\
							    ||＿＿＿＿＿＿＿＿|\n\
							          | ::|\n\
							         _| ::|_"
							         )
					}
				});

				//kick
				WorkGadget.App.start();

				//ui elements
				$load.hide();
				$filter.hide();
			})
			.fail(function () {
				console.log("fail");
			})
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