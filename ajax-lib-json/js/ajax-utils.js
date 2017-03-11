(function(global){
	var ajaxUtils = {}; //fake namespace

	ajaxUtils.sendGetRequest = function(requestURL, responseHandler, isJsonResponse){
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			handleResponse(request,responseHandler, isJsonResponse);
		};
		request.open("GET",requestURL,true); //get ready for async get req
		request.send(null); //no body = null
	};	

	function handleResponse(request,responseHandler, isJsonResponse){
		if (request.readyState == 4 && request.status == 200) {

			if (isJsonResponse == undefined) {
				isJsonResponse = false;
			}

			if (isJsonResponse) {
				responseHandler(JSON.parse(request.responseText));
			}
			else{
				responseHandler(request.responseText);
			}				
		};
	};

	global.$ajaxUtils = ajaxUtils;


})(window);