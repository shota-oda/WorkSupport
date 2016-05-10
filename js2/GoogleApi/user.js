var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.user = WorkGadget.gApi.user || {};

WorkGadget.gApi.user.init = function () {

	//return Promise
	WorkGadget.gApi.user.getName = function () {
		var d = new $.Deferred();
		var request = gapi.client.plus.people.get({
			'userId' : 'me'
		});

		request.execute(function(resp) {
			console.log(resp);
			d.resolve(resp.name.familyName + resp.name.givenName);
		});

		return d;
	}

}
