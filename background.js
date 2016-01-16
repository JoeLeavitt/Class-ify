/******************************
 * Created by: Joseph Leavitt *
 * Last Edited: 1/16/16       *
 ******************************/

/* Fires injectScript.js when extension button is pressed */
chrome.browserAction.onClicked.addListener(function (tab)
{
	chrome.tabs.executeScript(tab.id, {
        "file": "injectScript.js"
	}, function () {
        console.log("Script Executed");
	});
});

/* XHTTP Request */
chrome.runtime.onMessage.addListener(
    function(request, sender, callback) {
        if (request.action == "xhttp") {
             var xhttp = new XMLHttpRequest();
             var method = request.method ? request.method.toUpperCase() : 'GET';

     xhttp.onload = function() {
        console.log("Loaded URl: " + request.url);
        console.log("Professor: " + request.professor);
        callback({
             response: xhttp.responseText,
             professorURL: request.link,
             professorIndex: request.index
        });

        console.log("Does callback work?");
    };

        xhttp.onerror = function() {
            // callback to clean up the communication port.
            console.log("error");
            callback();
        };

        console.log("Attempting to open URL: " + request.url);
        xhttp.open(method, request.url, true);

        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         }

        console.log("do we get after post?");

        xhttp.send(request.data);

        console.log("4HEAD?");

        return true; // prevents the callback from being called too early on return

        }
    }
);
