

chrome.browserAction.onClicked.addListener(function (tab)
{
	chrome.tabs.executeScript(tab.id, {
		"file": "injectScript.js"
	}, function () {
		console.log("Script Executed");
	});
});
