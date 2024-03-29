/*
	Content script to track the time spent viewing the page
 */

var startTime = Date.now();
var timeSpent = 0;
var showTime = null;

window.addEventListener('load', function() {
	if(!document.hidden)
		showTime = Date.now();

	window.addEventListener('visibilitychange', function() {
		if(document.hidden)
			timeSpent += Date.now() - showTime;
		else
			showTime = Date.now();
	});

	chrome.runtime.sendMessage({
		event: "timeTrackStart",
		url: location.href,
		viewTime: startTime,
		host: location.hostname
	});
});

window.addEventListener("beforeunload", function() {
	chrome.runtime.sendMessage({
		event: "timeTrackEnd",
		url: location.href,
		timespent: timeSpent,
		endViewTime: Date.now()
	});
});