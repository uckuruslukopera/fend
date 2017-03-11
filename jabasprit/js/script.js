// var x ="Yehaoeaeoaoeooaiiiaeoaeoa!"

//Dom Manipulation
// console.log(document.getElementById("title"));
// console.log(document instanceof HTMLDocument);

// function sayHello(){
// 	var name = document.getElementById("name").value;
// 	var message = "Hello " + name + "!";

// 	document.getElementById("content").textContent = message;
// }

// function sayHello(){
// 	var name = document.getElementById("name").value;
// 	var message = "<h2>Hello " + name + "!</h2>";
// 	document.getElementById("content").innerHTML = message;
// }

// function sayHello(){
// 	var name = document.getElementById("name").value;
// 	var message = "<h2>Hello " + name + "!</h2>";
// 	document.getElementById("content").innerHTML = message;

// 	if (name === "student") {
// 		var title = document.querySelector("#title").textContent;
// 		title += " & Lovin' it!"
// 		document.querySelector("h1").textContent = title;
// 	}
// }

// document.querySelector("button").addEventListener("click", sayHello);
// document.querySelector("button").onclick = sayHello;

document.addEventListener("DOMContentLoaded",
	function(event){
		function sayHello (event) {
      	this.textContent = "Said it!";
      	var name =
       	document.getElementById("name").value;
       	var message = "<h2>Hello " + name + "!</h2>";

      	document.getElementById("content").innerHTML = message;

      if (name === "student") {
        var title = 
          document.querySelector("#title").textContent;
        title += " & Lovin' it!";
        document.querySelector("h1").textContent = title;
      }
    }

    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", sayHello);

    //Mouse Event
    document.querySelector("body").addEventListener("mousemove",
    	    function (event){
    	    	if (event.shiftKey) {
    	    		console.log("x coordinate: " + event.clientX + " and y coordinate: " + event.clientY);
    	    	}
    	    	


    });


	}
);

