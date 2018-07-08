Meteor.cyoaFunctions = {
	timeline: function() {
		if (document.getElementById('visualization')) {
			var pageEvents = [];
			var pages = Pages.find( {cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "Constant" } } } ).fetch();
	// 				var pageEvents = [];
			for (var i = 0; i< pages.length; i++) {
				var pageBodies = PagesBodies.find({pageid:pages[i]._id}).fetch();
				var avidTime = 0;
				for (var j = 0; j < pageBodies.length; j++) {
					avidTime += pageBodies[j].time;
				}
				avidTime = avidTime / pageBodies.length;
				if (avidTime == 0) {
					avidTime = pageEvents[pageEvents.length -1].start;
				}
				pageEvents.push({
					_id: pages[i]._id,
					content: pages[i].title,
					start: new Date(avidTime),
				});
			}
			if (pageEvents) {
			console.log(pageEvents);
			pageEvents.sort(function(a, b) {
				var aStart = 0;
				var bStart= 0;
				if (a.start) {
					aStart = a.start.getTime();
				}
				if (b.start) {
					bStart = b.start.getTime();
				}
				if (aStart < bStart) {
					return -1;
				}
				if (aStart > bStart) {
					return 1;
				}
				if (aStart == bStart) {
					return 0;
				}
			});
		var addConstant = function (item, callback) {
				Meteor.timelineFunctions.prettyPrompt('Add item', 'Enter title for new item:', item.content,/* 'Enter text content for new item:', item.content,*/ function (value) {
				if (value) {
					console.log("Add item Enter title");
					console.log(item);
					console.log(value);
// 					item.title = value;
					item.cyoaid = Session.get("cyoaid");
// 					item.parent.0.parentid = "Constant";
					var returenedItem = "";
					Meteor.call("addConstant", item, function (error, result) {
						// identify the error
						if (error && error.error === "logged-out") {
						// show a nice error message
							Session.set("errorMessage", "Please log in to post a comment.");
						} else {
							returenedItem = result;
						}
					});
// 					var refreshIntervalId = setInterval(function(){
// 						if (returenedItem != "") {
// 							callback(returenedItem); // send back adjusted new item
// 							clearInterval(refreshIntervalId);
// 						}
// 					}, intervTime);
				} else {
				callback(null); // cancel item creation
				}
			});
		};
		var moveConstant= function (item, callback) {
			var title = 'Do you really want to move the item to\n' +
				'start: ' + item.start + '\n' +
				'end: ' + item.end + '?';
			Meteor.timelineFunctions.prettyConfirm('Move item', title, function (ok) {
				if (ok) {
					Meteor.call("updateConstant", item, function (error) {
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
		var updateConstant = function (item, callback) {
			Meteor.timelineFunctions.prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
				if (value) {
					item.content = value;
					Meteor.call("updateConstant", item, function (error) {
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
		removeConstant = function (item, callback) {
			Meteor.timelineFunctions.prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
				if (ok) {
					Meteor.call("removePage", item, function (error) {
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
			console.log(pageEvents);
				if (pageEvents[0]) {
					var end;
					if (pageEvents[pageEvents.length-1].start) {
						end = new Date(pageEvents[pageEvents.length-1].start.getTime() + 100000000)
					}
					Meteor.timelineFunctions.timeline(inputItems=pageEvents, add=addConstant, move=moveConstant, update=updateConstant, remove=removeConstant, min=new Date(pageEvents[0].start.getTime() - 100000000)/*, max=new Date(pageEvents[pageEvents.length-1].start.getTime() + 100000000)*/, itemid="pageEventid");
				}
			}
		}
		
	},
	network: function() {
		console.log("Meteor.cyoaFunctions.network");
		if (document.getElementById('treeVisualization')) {
			var cyoaid = "";
			cyoaid = Session.get("cyoaid");
			var pages = Pages.find( { cyoaid:cyoaid } ).fetch();
				var pageEvents = [];
				var pageEdges = [];
				for (var i = 0; i< pages.length; i++) {
					var pageBodies = PagesBodies.find({pageid:pages[i]._id}).fetch();
					console.log("pageBodies: " + pageBodies);
					var pageLbl = "";
					if (pages[i].title.length < 0) {
						pageLbl = pages[i].pageBodies[0].texts[0].paragraphs[0].paragraph;
						pageLbl = pageLbl.substring(0, 10);
					} else {
						pageLbl = pages[i].title
					}
// 					pageLbl = pageLbl.substring(0, 35);// + "...";
					pageEvents.push({
						id: pages[i]._id,
						label: pageLbl,
					});
					for (var pari = 0; pari < pages[i].parent.length; pari++) {
						console.log(pages[i]);
						if (pages[i].parent[pari].parentid != "Constant" && pages[i].parent[pari].parentid != "none") {
							var parentPage = PagesBodies.find( {
								_id: pages[i].parent[pari].parentid
							} ).fetch();
							pageEdges.push(
							{
								from: parentPage[0].pageid,
								to: pages[i]._id,
// 								dashes:true,
// 								arrows:{to:{scaleFactor:2}}
							});
						}
					}
				}
				if (pageEvents) {
					console.log(pageEvents);
					console.log(pageEdges);
					if (pageEvents[0]) {
						console.log(pageEvents[0]);
						Meteor.neTreeFunctions.network(nodes=new vis.DataSet(pageEvents), edges = new vis.DataSet(pageEdges));
					}
			}
		}
	},
	
}
