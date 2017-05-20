Meteor.eventFunctions = {
	timeline: function() {
		if (document.getElementById('visualization')) {
			var events = Events.find(
					{ worldid:Session.get("worldid") },
					{ sort:{begining: 1} },
					{ limit : Session.get("objLimit")}
				).fetch();
	// 				var events = [];
			if (events) {
				for (var i = 0; i < events.length; i++) {
					events[i].start = new Date(parseInt(events[i].start));
				}
			}
			/*
	// 	for (var i = 0; i< mongoEvents.length; i++) {
	// 		if (mongoEvents[i].end) {
	// 			events.push({id:mongoEvents[i]._id, content:mongoEvents[i].content, start:new Date(parseInt(mongoEvents[i].start)), end:parseInt(mongoEvents[i].end)});
	// 		} else {
	// 			events.push({id:mongoEvents[i]._id, content:mongoEvents[i].content, start:new Date(parseInt(mongoEvents[i].start))});
	// 		}
	// 	}
	*/
			var addEvent = function(item, callback) {
					Meteor.timelineFunctions.prettyPrompt('Add item', 'Enter title for new item:', item.content,/* 'Enter text content for new item:', item.content,*/ function (value) {
					if (value) {
						console.log("Add item Enter title");
						console.log(item);
						console.log(value);
						item.content = value;
						item.cyoaid = Session.get("cyoaid");
						var returenedItem = "";
						Meteor.call("addEvent", item, Session.get("worldid"), function (error, result) {
							// identify the error
							if (error && error.error === "logged-out") {
							// show a nice error message
								Session.set("errorMessage", "Please log in to post a comment.");
							} else {
								returenedItem = result;
							}
						});
						var refreshIntervalId = setInterval(function(){
							if (returenedItem != "") {
								callback(returenedItem); // send back adjusted new item
								clearInterval(refreshIntervalId);
							}
						}, intervTime);
					} else {
					callback(null); // cancel item creation
					}
				});
			};
			var moveEvent = function(item, callback) {
				var title = 'Do you really want to move the item to\n' +
					'start: ' + item.start + '\n' +
					'end: ' + item.end + '?';
				Meteor.timelineFunctions.prettyConfirm('Move item', title, function (ok) {
					if (ok) {
						Meteor.call("updateEvent", item, function (error) {
						// identify the error
			// 			console.log(error);
						if (error && error.error === "logged-out") {
						// show a nice error message
							Session.set("errorMessage", "Please log in to post a comment.");
						}
					});
					callback(item); // send back item as confirmation (can be changed)
					} else {
					callback(null); // cancel editing item
					}
				});
			};
			var updateEvent = function(item, callback) {
				Meteor.timelineFunctions.prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
					if (value) {
						item.content = value;
						Meteor.call("updateEvent", item, function (error) {
							// identify the error
			// 				console.log(error);
							if (error && error.error === "logged-out") {
							// show a nice error message
								Session.set("errorMessage", "Please log in to post a comment.");
							}
						});
						callback(item); // send back adjusted item
					} else {
						callback(null); // cancel updating the item
					}
				});
			};
			var removeEvent = function(item, callback) {
				Meteor.timelineFunctions.prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
					if (ok) {
						Meteor.call("removeEvent", item, function (error) {
						// identify the error
						if (error && error.error === "logged-out") {
						// show a nice error message
							Session.set("errorMessage", "Please log in to post a comment.");
						}
					});
					callback(item); // confirm deletion
					}
					else {
					callback(null); // cancel deletion
					}
				});
			};
			Meteor.timelineFunctions.timeline(inputItems=events, add=addEvent, move=moveEvent, update=updateEvent, remove=removeEvent, itemid="eventid");
		}
	},
}