var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.mail = WorkGadget.gApi.mail || {};

WorkGadget.gApi.mail.init = function () {
  WorkGadget.gApi.mail.send = function (tos, subject, body){
  
    var mail = [
        "To: $to",
        "Cc: $cc",
        "Bcc: $bcc",
        "Subject: =?utf-8?B?$subject?=",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 7bit",
        "",
        "$body"
      ].join("\n").trim();

    mail = mail
      .replace("$to", tos.To.join(","))
      .replace("$cc", tos.Cc.join(",") || "")
      .replace("$bcc", tos.Bcc.join(",") || "")
      .replace("$subject", window.btoa(unescape(encodeURIComponent(subject))))
      .replace("$body", body);

    var request = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(unescape(encodeURIComponent(mail))).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });

    console.log(mail);
    if(WorkGadget.TestMode == true){
      request.execute();
    }
  }

  WorkGadget.gApi.mail.list = function (query) {

    var d = new $.Deferred()

    var getPageOfMessages = function(request) {
      request.execute(function(resp) {
          
          if (resp.resultSizeEstimate === 0) return;

          d.resolve(resp.messages);
          var nextPageToken = resp.nextPageToken;

          if (nextPageToken) {
            request = gapi.client.gmail.users.messages.list({
                'userId': "me",
                'pageToken': nextPageToken,
                'q': query
            });
            getPageOfMessages(request);
          }
      });
    };

    var initialRequest = gapi.client.gmail.users.messages.list({
      'userId': "me",
      'q': query,
    });

    getPageOfMessages(initialRequest);

    return d;
  }

  WorkGadget.gApi.mail.getMessage = function (messageId) {

    var d = new $.Deferred()

    var request = gapi.client.gmail.users.messages.get({
      'userId': "me",
      'id': messageId
    });

    request.execute(function(resp){
      d.resolve(resp);
    });

    return d;
}

}
