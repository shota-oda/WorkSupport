var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.calendar = WorkGadget.gApi.calendar || {};

WorkGadget.gApi.calendar.init = function () {
  WorkGadget.gApi.calendar.getTodayEvent = function () {
    var date = new Date();
    tommorrow = new Date(date.getYear(), date.getMonth(), date.getDate() + 1)
    today = new Date(date.getYear(), date.getMonth(), date.getDate())
    var request = gapi.client.calendar.events.list({
      'calendarId': encodeURIComponent("bizreach.co.jp_s8d05g2boqil5gvdj7a091972c@group.calendar.google.com"),
      'timeMin': today.toISOString(),
      'timeMax': tommorrow.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;
      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          console.log(event.summary + ' (' + when + ')')
        }
      } else {
        console.log('No upcoming events found.');
      }
    });
  }
}
