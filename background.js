/******************************
 * Created by: Joseph Leavitt *
 * Last Edited: 11/06/15      *
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
chrome.runtime.onMessage.addListener(function (request, sender, callback)
{
	if(request.action = "xhttp")
	{
		var xhttpRequest = new XMLHttpRequest();
		var method = request.method ? request.method.toUpperCase() : 'GET';
		var professorName = request.professorName;
		var url = request.url;

		var data = {
			responseXML: "",
			professorName: professorName,
			url: url
		};

		xhttp.onload = function()
		{
			data.responseXML = this.responseText;
			callback(data);
		};

		xhttp.onerror = function()
		{
			callback();
		};

		xhttp.open(method, request.url, true);

		if(method == 'POST')
			xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhttp.send();

		return true;
	}
});

