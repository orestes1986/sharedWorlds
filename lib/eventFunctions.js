Meteor.eventFunctions = {
	timeline: function() {
		var refreshIntervalEvents = setInterval(function(){
			// note that months are zero-based in the JavaScript Date object, so month 3 is April
			if (document.getElementById('visualization')) {
				var events = Events.find(
						{ worldid:Session.get("worldid") },
						{ sort:{begining: 1} },
						{ limit : Session.get("objLimit")}
					).fetch();
				var items = new vis.DataSet( events );
		// 		var min = Session.get("worldBegins");// new Date(2013, 3, 1); // 1 april
		// 		var max = Session.get("worldEnds");// new Date(2013, 3, 30, 23, 59, 59); // 30 april
				var container = document.getElementById('visualization');
				container.innerHTML = "";
				var options = {
					editable: true,
					onAdd: function (item, callback) {
						prettyPrompt('Add item', 'Enter title for new item:', item.content,/* 'Enter text content for new item:', item.content,*/ function (value) {
						if (value) {
							item.content = value;
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
					},
					onMove: function (item, callback) {
					var title = 'Do you really want to move the item to\n' +
						'start: ' + item.start + '\n' +
						'end: ' + item.end + '?';
					prettyConfirm('Move item', title, function (ok) {
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
						}
						else {
						callback(null); // cancel editing item
						}
					});
					},
					onUpdate: function (item, callback) {
					prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
						if (value) {
						item.content = value;
							Meteor.call("updateEvent", item, function (error) {
							// identify the error
				// 			console.log(error);
							if (error && error.error === "logged-out") {
							// show a nice error message
								Session.set("errorMessage", "Please log in to post a comment.");
							}
						});
						callback(item); // send back adjusted item
						}
						else {
						callback(null); // cancel updating the item
						}
					});
					},

					onRemove: function (item, callback) {
					prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
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
					}
				};
				var timeline = new vis.Timeline(container, items, options);

				items.on('*', function (event, properties) {
					logEvent(event, properties);
				});
					timeline.on('select', function (properties) {
						if (items._data[properties.items]) {
							Session.set("eventid", items._data[properties.items]._id);
						}
						for (var i = 0; i < document.getElementsByClassName("delete").length; i++) {
							document.getElementsByClassName("delete")[i].className += " glyphicon glyphicon-remove";
						}
					});
				function logEvent(event, properties) {
					var log = document.getElementById('log');
					var msg = document.createElement('div');
					msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
						'properties=' + JSON.stringify(properties);
				//     log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
				}
				function prettyConfirm(title, text, callback) {
					swal({
					title: title,
					text: text,
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: "#DD6B55"
					}, callback);
				}
				function prettyPrompt(title, text, inputValue, callback) {
					swal({
					title: title,
					text: text,
					type: 'input',
					showCancelButton: true,
					inputValue: inputValue
					}, callback);
				}
				clearInterval(refreshIntervalEvents);
			}
		}, intervTime);
	},
}