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

  var $filter = $("#filter")
  var $authButton = $("#Auth-Button")
  var $output = $("#Out")

  self.start = function () {
    self.initAfterClientLoad()
    WorkGadget.Common.fn.DoAsync(self.handleAuth(self.checkAuth))
  }

  self.status = {
      isAuthorized: false
    , isLibraryReady: false
    , isSubLibraryReady: false
  }
  
  self.initAfterClientLoad = function () {
    gapi.client.setApiKey(apiKey);
    self.checkAuth = function () {
      gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: true}
      , function (authResult) {
        if (authResult && !authResult.error) {
          // auth is done
          self.status.isAuthorized = true;
          return true
        } else {
          // auth is fail
          self.status.isAuthorized = false;
          console.log(authResult.error)
          return false
        }
      });
    }
  }

  self.handleAuth = function (result) {
    if (result) {
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
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, self.checkAuth);
      })
    }
  }


  function loadSubClients () {
    return $.when(
        gapi.client.load('plus', 'v1')
      , gapi.client.load('gmail', 'v1')
      , gapi.client.load('plus', 'v1')
    )
  }

})();

 function gapiInit () {
    isLibraryReady = true
    WorkGadget.gApi.start()
}



