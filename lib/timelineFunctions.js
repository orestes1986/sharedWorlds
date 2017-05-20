Meteor.timelineFunctions = {
	logItem: function(event, properties) {
		var log = document.getElementById('log');
		var msg = document.createElement('div');
		msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
			'properties=' + JSON.stringify(properties);
	//     log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
	},
	prettyConfirm: function (title, text, callback) {
		swal({
		title: title,
		text: text,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: "#DD6B55"
		}, callback);
	},
	prettyPrompt: function(title, text, inputValue, callback) {
		swal({
		title: title,
		text: text,
		type: 'input',
		showCancelButton: true,
		inputValue: inputValue
		}, callback);
	},
	timeline: function() {
		console.log(inputItems);
		console.log(itemid);
// 		console.log(min);
		var refreshIntervals = setInterval(function() {
			// note that months are zero-based in the JavaScript Date object, so month 3 is April
			console.log("timelineFunctions timeline");
			console.log(inputItems);
// 			for () {
// 				start = inputItems[0].start;
// 			}
			if (document.getElementById('visualization')) {
				var max_date_value = 8640000000000000;
				var items = new vis.DataSet( inputItems );
				if (!min) {
					var min = new Date(-max_date_value);
				} else {
// 					min -=  (8 * Math.pow(10, 5));
				}
				if (!max) {
					var max = new Date(max_date_value);
				} else {
// 					min +=  (8 * Math.pow(10, 5));
				}
				var start = min;
				var end = max;
				if (inputItems) {
					if (inputItems.length > 0) {
						var starts = inputItems;
						var ends = inputItems;
						console.log(starts);
						console.log(ends);
						starts.sort(
							function(a, b) {
								var aStart = 0;
								var bStart = 0;
								if (a.start) {
									aStart = a.start;
								}
								if (b.start) {
									bStart = b.start;
								}
								if (aStart < bStart) {
									return 1;
								}
								if (aStart > bStart) {
									return -1;
								}
								if (aStart == bStart) {
									return 0;
								}
							}
						);
						console.log(starts[0].start);
						start = starts[0].start;
						end = starts[starts.length-1].start;
					}
				}
				var container = document.getElementById('visualization');
				container.innerHTML = "";
				var options = {
					stack: true,
					horizontalScroll: true,
					zoomKey: 'ctrlKey',
					maxHeight: 400,
					margin: {
						item: 10, // minimal margin between items
						axis: 5   // minimal margin between items and the axis
					},
					showCurrentTime: false,
					start: start,
					end: end,
					min: min,
					max: max,
					editable: true,
					onAdd: add,
					onMove: move,
					onUpdate: update,
					onRemove: remove,
				};
				var timeline = new vis.Timeline(container, items, options);

				items.on('*', function (event, properties) {
					Meteor.timelineFunctions.logItem(event, properties);
				});
					timeline.on('select', function (properties) {
						if (items._data[properties.items]) {
							Session.set(itemid, items._data[properties.items]._id);
						}
						for (var i = 0; i < document.getElementsByClassName("delete").length; i++) {
							document.getElementsByClassName("delete")[i].className += " glyphicon glyphicon-remove";
						}
					});
				clearInterval(refreshIntervals);
			}
		}, intervTime);
	},
}