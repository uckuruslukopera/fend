(function(global){
	var ajaxUtils = {}; //fake namespace

	ajaxUtils.sendGetRequest = function(requestURL, responseHandler){
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			handleResponse(request,responseHandler);
		};
		request.open("GET",requestURL,true); //get ready for async get req
		request.send(null); //no body = null
	};	

	function handleResponse(request,responseHandler){
		if (request.readyState == 4 && request.status == 200) {
			responseHandler(request);
		};
	};

	global.$ajaxUtils = ajaxUtils;


})(window);