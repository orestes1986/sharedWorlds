////////
/// numParam	EVENTS
////////

Template.numParam_edit_form.events({
	'submit #updateNumParamForm':function(event){
// 		console.log("param_edit_form...");
		$("#numParam_edit_form").modal('hide');
	},
	'click .js-editable-value': function(event){
		$(event.currentTarget).attr("contentEditable", true);
	},
	'click #numParam_edit_form': function(event){
// 		console.log("#numParam_edit_form");
		var editableElements = document.getElementsByClassName("js-editable-value");
		for (var i = 0; i < editableElements.length; i++) {
			if (editableElements[i].textContent.isContentEditable){
// 				console.log("Found an edited One");
// 				console.log(editableElements[i].textContent);
				var text = editableElements[i].textContent;
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
				text = String(text).replace(/(\t)/gm,'');
				text = String(text).replace(" ",'');
				var numParam = NumParams.findOne({_id:Session.get("paramid")});
				if(numParam){ // data-pp-index="{{ppIndex}}
// 					console.log(editableElements[i].getAttribute("data-pp-index"));
					var value = {value:text};
					var updatingFlag = Meteor.call("updateNumParamPoolPoint", numParam._id, editableElements[i].getAttribute("data-pp-index"), value); // calling: ~/sharedworlds/shared/numParamPoolmain.js - updateNumParamPoolPoint/~ //
					if (updatingFlag) {
// 						console.log("js-editable-value key down");
						editableElements[i].textContent = numParam.data.editableElements[i].getAttribute("data-pp-index").value;
					}
				}
			}
		}
	},
	'keydown .js-editable-num': function(event){
		if (event.keyCode == 10 || event.keyCode == 13) {
// 			console.log("Enter was pressed");
			event.preventDefault();
			$(event.currentTarget).attr("contentEditable", false);
			var text = $(event.currentTarget).text();
			console.log("text",text);
			if (isNaN(text)) {
				var msg = "Please use only numbers";
				FlashMessages.sendWarning(msg);
			} else {
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
				text = String(text).replace(/(\t)/gm,'');
				text = String(text).replace(" ",'');
	// 			console.log($(event.currentTarget).attr("data-pp-index"));
				var numParam = NumParams.findOne({_id:Session.get("numParamid")});
				var value = {value:text};
	// 			Meteor.call("updateNumParamPoolPoint", numParam._id, editableElements[i].getAttribute("data-pp-index"), value); // calling: ~/sharedworlds/shared/numParamPoolmain.js - updateNumParamPoolPoint/~ //
				Meteor.call("updateNumParamPoolPoint", numParam._id, $(event.currentTarget).attr("data-pp-index"), value); // calling: ~/sharedworlds/shared/numParamPoolmain.js - updateNumParamPoolPoint/~ //
			}
		}
	},
	'keydown .js-editable-data': function(event){
		if (event.keyCode == 10 || event.keyCode == 13) {
// 			console.log("js-editable-data keydown");
			event.preventDefault();
			$(event.currentTarget).attr("contentEditable", false);
			var text = $(event.currentTarget).text();
			console.log("text",text);
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
				text = String(text).replace(/(\t)/gm,'');
				text = String(text).replace(" ",'');
				var numParam = NumParams.findOne({_id:Session.get("numParamid")});
				var value = {value:text};
				Meteor.call("updateNumParamField", numParam._id, $(event.currentTarget).attr("data-value-index"), value); // calling: ~/sharedworlds/shared/numParamfieldmain.js - updateNumParamField/~ //
		}
	},
	'click .js-add-points': function(event) {
		var numParam = NumParams.findOne({_id:Session.get("numParamid")});
		var ppIndex = $(event.currentTarget).attr("data-pp-index");
		console.log("ppIndex",ppIndex);
		var value = { value: "0", pageid: Session.get("pageid") };
		Meteor.call("addNumParamPoolPoint", numParam._id, value, function(error, result){
				if (error) {
// 				alert('Error');
				}else{
					if (result == 1) {
						var msg = "Value added!";
// 						console.log(msg);
						FlashMessages.sendSuccess(msg);
					} else if (result == 2) {
						var msg = "Please attach to a body this value or another one not currently attached to a body, otherwise this page might not behave as expected!";
						$('.js-pages-body').addClass('js-pages-num-body-addValue-clickable');
						for (var ppI = 0; ppI < numParam.point_pool.length; ppI++) {
							if (numParam.point_pool[ppI].pageid == Session.get("pageid")) {
// 								console.log("One For this page");
								if (numParam.point_pool[ppI].bodyid) {
// 									console.log("One with body");
									for (var bodyI = 0; bodyI < document.getElementsByClassName("js-pages-body").length; bodyI++) {
										var elem = document.getElementsByClassName("js-pages-body")[bodyI];
// 										console.log("One attached to a body");
										if (elem.getAttribute("data-this-id") == numParam.point_pool[ppI].bodyid) {
// 											console.log("One paired");
// 											console.log(elem.getAttribute("data-this-id"));
// 											console.log(param.point_pool[ppI].bodyid);
											elem.classList.add('css-pages-body-is-paired');
											elem.classList.add('js-pages-num-body-is-paired');
										}
									}
								}
							}
						}
						$("#numParam_edit_form").modal('hide');
						FlashMessages.sendError(msg);
					} else if (result == 3) {
						var msg = "Not a valid numParam";
// 						console.log(msg);
						FlashMessages.sendWarning(msg);
					} else if (result == 0) {
						var msg = "You are not the owner";
// 						console.log(msg);
						FlashMessages.sendWarning(msg);
					}
				}
			}); // calling: ~/sharedworlds/shared/numParamPoolmain.js - addNumParamPoolPoint/~ //
// 			FlashMessages.sendSuccess("Message");
// 			FlashMessages.sendWarning("Message");
// 			FlashMessages.sendError("Message");
// 			FlashMessages.sendInfo("Message");
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-add-data': function(event) {
		var numParam = NumParams.findOne({_id:Session.get("numParamid")});
		console.log("js-add-data clicked");
		Meteor.call("addNumParamField", numParam._id);//, Session.get("pageid")); // calling: ~/sharedworlds/shared/numParamfieldmain.js - addNumParamField/~ //
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-remove-data': function(event) {
// 		console.log("js-remove-data key click");
		var numParam = NumParams.findOne({_id:Session.get("numParamid")});
		Meteor.call("removeNumParamField", numParam._id, $(event.currentTarget).attr("data-data-index"));
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-remove-numParam': function(event) {
		var numParam = NumParams.findOne({_id:Session.get("numParamid")});
		Meteor.call("removeNumParam", numParam._id, $(event.currentTarget).attr("data-pp-index"));
		console.log(numParam);
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
		$("#numParam_edit_form").modal('hide');
	},
	'click .js-set-body-to-numParam': function(event){
		console.log("Connect numParam to body clicked");
// 		console.log($(event.currentTarget).attr("data-pp-index"));
// 		console.log($(event.currentTarget).attr("data-value-index"));
// 		Session.set(value);
		var numParam = NumParams.findOne({_id:Session.get("numParamid")});
		var ppIndex = $(event.currentTarget).attr("data-pp-index");
		console.log("$(event.currentTarget)", $(event.currentTarget));
		console.log("ppIndex", ppIndex);
		$('.js-pages-body').attr("data-numParam-id", Session.get("numParamid"));
		$('.js-pages-body').attr("data-pp-index", ppIndex);
		$('.js-pages-body').addClass('js-pages-num-body-clickable');
		for (var dataI = 0; dataI < numParam.point_pool.length; dataI++) {
			if (numParam.point_pool[ppIndex].pageid == Session.get("pageid")) {
// 				console.log("One For this page");
				if (numParam.point_pool[ppIndex].bodyid) {
// 					console.log("One with body");
					for (var bodyI = 0; bodyI < document.getElementsByClassName("js-pages-body").length; bodyI++) {
						var elem = document.getElementsByClassName("js-pages-body")[bodyI];
// 						console.log("One attached to a body");
						if (elem.getAttribute("data-this-id") == numParam.point_pool[ppIndex].bodyid) {
// 							console.log("One paired");
// 							console.log(elem.getAttribute("data-this-id"));
// 							console.log(param.data[dataindex].values[dataI].bodyid);
							elem.classList.add('css-pages-body-is-paired');
							elem.classList.add('js-pages-num-body-is-paired');
						}
					}
				}
			}
		}
		$("#numParam_edit_form").modal('hide');
	},
// 		'submit .js-editable-value': function(event){
// 			console.log("js-editable-value submited");
// 		},
});
