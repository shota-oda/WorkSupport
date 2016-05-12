var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.calendar = WorkGadget.gApi.calendar || {};

WorkGadget.gApi.calendar.init = function () {
  
  //async
  WorkGadget.gApi.calendar.getTommorrowEvents = function (calIDs){
    
    var d = new $.Deferred();
    var date = new Date();
    var from = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    var to = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2)
    
    $.each(calIDs, function(){
      var id = this
      var request = gapi.client.calendar.events.list({
        'calendarId': id,
        'timeMin': from.toISOString(),
        'timeMax': to.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });

      request.execute(function (resp){
        var events = resp.items;
        if (events.length <= 0) return;
        
        var summaries = [];
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          if(event.start.dateTime){
            summaries.push(event.summary)
          }
        }

        d.resolve(summaries);
      });
    })

    return d;
  }

  WorkGadget.gApi.calendar.getTodayEvents = function () {
    
    var d = new $.Deferred();
    var date = new Date();
    var tommorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    if(!gapi.client.calendar.events){
      console.log("error, gapi.client.calendar.events.list is undefined");
    }
    var request = gapi.client.calendar.events.list({
      'calendarId': "bizreach.co.jp_s8d05g2boqil5gvdj7a091972c@group.calendar.google.com",
      'timeMin': today.toISOString(),
      'timeMax': tommorrow.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function (resp){
      var events = resp.items;
      if (events.length <= 0) return;
      
      var summaries = [];
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        if(event.start.dateTime){
          summaries.push(event.summary)
        }
      }

      d.resolve(summaries);
    });

    return d;
  }
}
