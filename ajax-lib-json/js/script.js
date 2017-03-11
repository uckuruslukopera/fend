document.addEventListener("DOMContentLoaded",function(event){
	document.querySelector("button").addEventListener("click",function(){
		$ajaxUtils.sendGetRequest("data/name.json",function(resp){
			var message = resp.firstName + " " + resp.lastName;
			if (resp.isLivelyPerson) {
				message += " is a lively person";
			}
			else{
				message += " is not a very lively person";
			}
			message += " and wants to live until " + resp.wantsToLiveUntil + ".";
			
			document.querySelector("#content").innerHTML = "<h2>" + message + "</h2>"
		}, true);
	});
});