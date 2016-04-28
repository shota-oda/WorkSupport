var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};

(function () {
  'use strict';
  var self = WorkGadget.gApi

  var clientId = '57364377556-pi3vi76p5kqpjsj9l2d6icqugju2u0t2.apps.googleusercontent.com';

  var apiKey = 'AIzaSyDvAoP9X1_8Kos9lmu8aZ2EkwJofe41J54';

  var scopes = [
      "https://www.googleapis.com/auth/plus.me"           //View User Info
    , "https://www.googleapis.com/auth/gmail.compose"     //Manage drafts and send emails
    , "https://www.googleapis.com/auth/gmail.readonly"    //View email message and settings
    , "https://www.googleapis.com/auth/calendar.readonly" //View Calendar
  ];

  self.init = function () {
    gapi.client.setApiKey(apiKey);
    self.checkAuth = function (im,fn) {
      gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: im}, function(result){
          fn((result && !result.error));
      });
    }
  }

  self.status = {
      isAuthorized: false
    , isLibraryReady: false
    , isSubLibraryReady: false
  }

  self.handleAuth = function (result) {
    if (result && !result.error) {
      // auth is done
      self.status.isAuthorized = true;
      loadSubClients()
      .done(function (){
        self.status.isSubLibraryReady = true
        $filter.hide()
        
      }).fail(function (){
        self.status.isSubLibraryReady = false
      })
    } else {
      // auth is fail
      self.status.isAuthorized = false;
      $authButton.on("click", function () {
        self.checkAuth(false)
      })
    }
  }


  function loadSubClients () {
    return $.when(
        gapi.client.load('plus', 'v1')
      , gapi.client.load('gmail', 'v1')
      , gapi.client.load('calendar', 'v3')
    )
  }

})();





