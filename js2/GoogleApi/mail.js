var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.mail = WorkGadget.gApi.mail || {};

(function () {
  WorkGadget.gApi.mail.send = function sendMessage(tos, subject, body){
  
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
      .replace("$to", tos.To)
//      .replace("$cc", tos.Cc || "")
//      .replace("$bcc", tos.Bcc || "")
      .replace("$subject", window.btoa(unescape(encodeURIComponent(subject))))
      .replace("$body", body);

    var request = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(unescape(encodeURIComponent(mail))).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });

    console.log(mail)

    request.execute();
  }


})()
