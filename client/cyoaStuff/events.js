////////
/// cyoa	EVENTS
////////

// Session.get("pageid") 

Template.deleteCyoa.events({
	// remove world button
	"click .js-remove-cyoa":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else { // they are logged in... lets insert a world
// 			console.log(this._id);
			console.log("Deleting Cyoa");
// 			var cyoa = {_id:Session.get("worldid")};
			Meteor.call("removeCyoa", this._id);
		}
	},
});

Template.addParam.events({
	'click .js-show-page-form':function(event){
// 		console.log("showing the modal...");
		$("#param_add_form").modal('show');
	},
	'submit #param_add_form':function(event){
		console.log("param_add_form submited...");
		console.log(event);
// 		$("#param_edit_form").modal('hide');
	},
});

Template.paramlist.events({
	'click .js-paramItem':function(event){
// 		console.log("showing the modal...");
		Session.set("paramid", this._id);
		$("#param_edit_form").modal('show');
	},
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
		console.log("#param_edit_form");
		var editableElements = document.getElementsByClassName("js-editable-value");
		for (var i = 0; i < editableElements.length; i++) {
// 			if (editableElements[i].getAttribute("data-clicked") == 'true') {
			if (!editableElements[i].textContent.isContentEditable){
				console.log("Found an edited One");
// 				console.log(editableElements[i]);
				var text = editableElements[i].textContent;//.replace(/(\r\n|\n|\r)/gm,"");
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
				text=String(text).replace(/(\t)/gm,'');
				text=String(text).replace(" ",'');
				var param = CyoaParams.findOne({_id:Session.get("paramid")});
				var updatingFlag = Meteor.call("updateParamFieldValue", param, editableElements[i].getAttribute("data-data-index"), editableElements[i].getAttribute("data-value-index"), text);
				if (updatingFlag) {
		// 			console.log("js-editable-value key down");
					editableElements[i].textContent = param.data.editableElements[i].getAttribute("data-data-index").values.editableElements[i].getAttribute("data-value-index").value;
// 					editableElements[i].setAttribute("data-clicked", "false");
				}
			}
		}
	},
	'keydown .js-editable-value': function(event){
		if (event.keyCode == 10 || event.keyCode == 13) {
			console.log("Enter was pressed");
			event.preventDefault();
			$(event.currentTarget).attr("contentEditable", false);
			var text = $(event.currentTarget).text();//.replace(/(\r\n|\n|\r)/gm,"");
// 			console.log(text);
			text = String(text).replace(/(\r\n|\n|\r)/gm,"");
// 			console.log(text);
			text=String(text).replace(/(\t)/gm,'');
			text=String(text).replace(" ",'');
			console.log(text);
// 			return false;
// Submit the form, etc.
			var param = CyoaParams.findOne({_id:Session.get("paramid")});
			Meteor.call("updateParamFieldValue", param, $(event.currentTarget).attr("data-data-index"), $(event.currentTarget).attr("data-value-index"), text);
		}
	},
	'click .js-add-value': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("addParamFieldValue", param, $(event.currentTarget).attr("data-data-index"), Session.get("pageid"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-add-data': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("addParamField", param, Session.get("pageid"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-remove-data': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("removeParamField", param, $(event.currentTarget).attr("data-data-index"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-remove-param': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("removeParam", param, $(event.currentTarget).attr("data-data-index"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
		$("#param_edit_form").modal('hide');
	},
// 		'submit .js-editable-value': function(event){
// 			console.log("js-editable-value submited");
// 		},
});