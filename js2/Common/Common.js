var WorkGadget = WorkGadget || {};
WorkGadget.Common = WorkGadget.Common || {};

WorkGadget.Common.fn = {
	DoAsync: function (func){
		setTimeout(func, 1);
	}
}
