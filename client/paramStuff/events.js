////////
/// param	EVENTS
////////

Template.addParam.events({
	'click .js-show-param-form':function(event){
// 		console.log("showing the modal...");
		$("#param_add_form").modal('show');
	},
});
Template.param_add_form.events({
	'submit #submit_doc':function(event){
// 		console.log("showing the modal...");
		$("#param_add_form").modal('hide');
	},
});

Template.paramlist.events({
	'click .js-paramItem':function(event){
// 		console.log("showing the modal...");
		Session.set("paramid", this._id);
		$("#param_edit_form").modal('show');
	},
	'click .js-numParamItem':function(event){
// 		console.log("showing the modal...");
		Session.set("numParamid", this._id);
		$("#numParam_edit_form").modal('show');
	},
// 	'submit #param_add_form':function(event){
// 		console.log("param_add_form submited...");
// 		console.log(event);
// // 		$("#param_edit_form").modal('hide');
// 	},
});

Template.param_edit_form.events({
	'submit #updateParamForm':function(event){
// 		console.log("param_edit_form...");
		$("#param_edit_form").modal('hide');
	},
	'click .js-editable-value': function(event){
		$(event.currentTarget).attr("contentEditable", true);
	},
	'click #param_edit_form': function(event){
// 		console.log("#param_edit_form");
		var editableElements = document.getElementsByClassName("js-editable-value");
		for (var i = 0; i < editableElements.length; i++) {
			if (editableElements[i].textContent.isContentEditable){
// 				console.log("Found an edited One");
// 				console.log(editableElements[i].textContent);
				var text = editableElements[i].textContent;
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
				text = String(text).replace(/(\t)/gm,'');
				text = String(text).replace(" ",'');
				var param = CyoaParams.findOne({_id:Session.get("paramid")});
				if(param){
					var value = {value:text};
					var updatingFlag = Meteor.call("updateParamFieldValue", param._id, editableElements[i].getAttribute("data-data-index"), editableElements[i].getAttribute("data-value-index"), value);
					if (updatingFlag) {
// 						console.log("js-editable-value key down");
						editableElements[i].textContent = param.data.editableElements[i].getAttribute("data-data-index").values.editableElements[i].getAttribute("data-value-index").value;
					}
				}
			}
		}
	},
	'keydown .js-editable-value': function(event){
		if (event.keyCode == 10 || event.keyCode == 13) {
// 			console.log("Enter was pressed");
			event.preventDefault();
			$(event.currentTarget).attr("contentEditable", false);
			var text = $(event.currentTarget).text();
// 			console.log(text);
			text = String(text).replace(/(\r\n|\n|\r)/gm,"");
			text = String(text).replace(/(\t)/gm,'');
			text = String(text).replace(" ",'');
			var param = CyoaParams.findOne({_id:Session.get("paramid")});
			var value = {value:text};
			Meteor.call("updateParamFieldValue", param._id, $(event.currentTarget).attr("data-data-index"), $(event.currentTarget).attr("data-value-index"), value);
		}
	},
	'click .js-add-value': function(event) {
		console.log("js-add-value clicked");
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		var dataindex = $(event.currentTarget).attr("data-data-index");
		var value = { value: "Another value", pageid: Session.get("pageid") };
		Meteor.call("addParamFieldValue", param._id, dataindex, value, function(error, result){
				if (error) {
// 				alert('Error');
				}else{
					if (result == 1) {
						var msg = "Value added!";
// 						console.log(msg);
						FlashMessages.sendSuccess(msg);
					} else if (result == 2) {
						var msg = "Please attach to a body this value or another one not currently attached to a body, otherwise this page might not behave as expected!";
// 						console.log(msg);
						$('.js-pages-body').attr("data-data-index", dataindex);
						$('.js-pages-body').addClass('js-pages-body-addValue-clickable');
						for (var dataI = 0; dataI < param.data[dataindex].values.length; dataI++) {
							if (param.data[dataindex].values[dataI].pageid == Session.get("pageid")) {
// 								console.log("One For this page");
								if (param.data[dataindex].values[dataI].bodyid) {
// 									console.log("One with body");
									for (var bodyI = 0; bodyI < document.getElementsByClassName("js-pages-body").length; bodyI++) {
										var elem = document.getElementsByClassName("js-pages-body")[bodyI];
// 										console.log("One attached to a body");
										if (elem.getAttribute("data-this-id") == param.data[dataindex].values[dataI].bodyid) {
// 											console.log("One paired");
// 											console.log(elem.getAttribute("data-this-id"));
// 											console.log(param.data[dataindex].values[dataI].bodyid);
											elem.classList.add('css-pages-body-is-paired');
											elem.classList.add('js-pages-body-is-paired');
										}
									}
								}
							}
						}
						$("#param_edit_form").modal('hide');
						FlashMessages.sendError(msg);
					} else if (result == 3) {
						var msg = "Not a valid param";
// 						console.log(msg);
						FlashMessages.sendWarning(msg);
					} else if (result == 0) {
						var msg = "You are not the owner";
// 						console.log(msg);
						FlashMessages.sendWarning(msg);
					}
				}
			});
// 			FlashMessages.sendSuccess("Message");
// 			FlashMessages.sendWarning("Message");
// 			FlashMessages.sendError("Message");
// 			FlashMessages.sendInfo("Message");
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-add-data': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("addParamField", param._id, Session.get("pageid"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-remove-data': function(event) {
// 		console.log("js-remove-data key click");
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("removeParamField", param._id, $(event.currentTarget).attr("data-data-index"));
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-remove-param': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("removeParam", param._id, $(event.currentTarget).attr("data-data-index"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
		$("#param_edit_form").modal('hide');
	},
	'click .js-set-body-to-param': function(event){
		console.log("Connect param to body clicked");
// 		console.log($(event.currentTarget).attr("data-data-index"));
// 		console.log($(event.currentTarget).attr("data-value-index"));
// 		Session.set(value);
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		var dataindex = $(event.currentTarget).attr("data-data-index");
		$('.js-pages-body').attr("data-param-id", Session.get("paramid"));
		$('.js-pages-body').attr("data-data-index", dataindex);
		$('.js-pages-body').attr("data-value-index", $(event.currentTarget).attr("data-value-index"));
		$('.js-pages-body').addClass('js-pages-body-clickable');
		for (var dataI = 0; dataI < param.data[dataindex].values.length; dataI++) {
			if (param.data[dataindex].values[dataI].pageid == Session.get("pageid")) {
// 				console.log("One For this page");
				if (param.data[dataindex].values[dataI].bodyid) {
// 					console.log("One with body");
					for (var bodyI = 0; bodyI < document.getElementsByClassName("js-pages-body").length; bodyI++) {
						var elem = document.getElementsByClassName("js-pages-body")[bodyI];
// 						console.log("One attached to a body");
						if (elem.getAttribute("data-this-id") == param.data[dataindex].values[dataI].bodyid) {
// 							console.log("One paired");
// 							console.log(elem.getAttribute("data-this-id"));
// 							console.log(param.data[dataindex].values[dataI].bodyid);
							elem.classList.add('css-pages-body-is-paired');
							elem.classList.add('js-pages-body-is-paired');
						}
					}
				}
			}
		}
		$("#param_edit_form").modal('hide');
	},
// 		'submit .js-editable-value': function(event){
// 			console.log("js-editable-value submited");
// 		},
});

Template.condition_select_value.events({
	"click .js-set-condition-value":function(event){
// 		console.log("js-set-condition-value clicked");
// 		$("#condition_select_form").modal('hide');
// 		console.log(this);
		var userId = Meteor.userId();
		var dataIndex = $(event.currentTarget).attr("data-data-index");
		var valueIndex = $(event.currentTarget).attr("data-value-index");
// 		console.log("valueIndex");
// 		console.log(valueIndex);
		var selectedBodyid = Session.get("selectedBodyid");
		var selectedConditionIndex = Session.get("selectedConditionIndex");
		var paramid = Session.get("paramid");
		var realPageBody = PagesBodies.findOne({_id:selectedBodyid, owner:userId});
		if (realPageBody){
// 			console.log(realPageBody);
			realPageBody.conditions[selectedConditionIndex].index = selectedConditionIndex;
			realPageBody.conditions[selectedConditionIndex].paramid = paramid;
			realPageBody.conditions[selectedConditionIndex].paramIndex = dataIndex;
			realPageBody.conditions[selectedConditionIndex].paramValueIndex = valueIndex;
            realPageBody.conditions[selectedConditionIndex].numORnot = false;
// 			console.log(realPageBody);
		}
		Meteor.call("updatePageBodyCondition", selectedBodyid, realPageBody.conditions[selectedConditionIndex]);
// 		Meteor.call("removePageBodyChoice", this.bodyid, this.choiceid);
// 		console.log(event);
		$("#condition_select_value").modal('hide');
	},
});
