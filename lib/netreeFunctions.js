Meteor.neTreeFunctions = { // using vis.js package
/*	logItem: function(event, properties) {
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
	},*/
	network: function() {
		console.log("Hahahahahahahaah000");
		console.log(nodes);
		console.log(edges);
// 		console.log(itemid);
		var container = document.getElementById('treeVisualization');
		container.innerHTML = "";
		var data = {
			nodes: nodes,
			edges: edges
		};
		var options = {
			nodes:{
// 				borderWidth: 0,
				size: 35,
				opacity:.3,
// 				hidden: true,
// 				font: {
// 					multi: true,
// 				},
				label: {
					enabled: true,
					min: 14,
					max: 30,
					maxVisible: 10,
					drawThreshold: 5
				},
			},
			edges:{
				arrows: {
					to:     true,
				},
				arrowStrikethrough: true,
				chosen: true,
				color: {
					color:'#000088',
					highlight:'#880000',
					hover: '#008800',
					opacity:.5
				},
			},
	/*
// 			manipulation: false,
// 			autoResize: true,
// 			height: '90%',
// 			layout: {
// 				hierarchical: {
// 				enabled: true,
// 				levelSeparation: 300
// 				}
// 			},
// 			nodes: {
// 				size: 500,
// 			},*/
		};
		var network = new vis.Network(container, data, options);
		network.on("doubleClick", function (params) {
			params.event = "[original event]";
			newUrl = document.location.href + "/../page/"+params.nodes[0];
			document.location.href = newUrl;
			//../page/+params.nodes[0]
		});
	},
}
