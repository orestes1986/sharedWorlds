////////
/// cyoa	EVENTS
////////

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
	'click #param_edit_form': function(event){
		var editableElements = document.getElementsByClassName("js-editable-value");
		for (var i = 0; i < editableElements.length; i++) {
			if (editableElements[i].getAttribute("data-clicked") == 'true') {
// 				console.log("Found an edited One");
// 				console.log(editableElements[i]);
					
				var text = editableElements[i].textContent;//.replace(/(\r\n|\n|\r)/gm,"");
// 				console.log(text);
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
// 				console.log(text); 
				text=String(text).replace(/(\t)/gm,'');
				text=String(text).replace(" ",'');
// 				console.log(text);

		// 		console.log(this);
		// 		console.log(this.toString());
// 				console.log(text);
		// 		console.log(editableElements[i].value);
				var param = CyoaParams.findOne({_id:Session.get("paramid")});
				var updatingFlag = Meteor.call("updateParamFieldValue", param, editableElements[i].getAttribute("data-data-index"), editableElements[i].getAttribute("data-value-index"), text);
				if (updatingFlag) {
		// 			console.log("js-editable-value key down");
					editableElements[i].setAttribute("data-clicked", "false");
				}
			}
		}
	},
	'click .js-editable-value': function(event){
// 		if (event.keyCode == 10 || event.keyCode == 13) {
// 			event.preventDefault();
// 			// Submit the form, etc.
			$(event.currentTarget).attr("data-clicked", "true");
// 		}
	},
	'keyup .js-editable-value': function(event){
		if (event.keyCode == 10 || event.keyCode == 13) {
			event.preventDefault();
			// Submit the form, etc.
			var text = $(event.currentTarget).text();//.replace(/(\r\n|\n|\r)/gm,"");
// 				console.log(text);
				text = String(text).replace(/(\r\n|\n|\r)/gm,"");
// 				console.log(text);
				text=String(text).replace(/(\t)/gm,'');
				text=String(text).replace(" ",'');
// 				console.log(text);

// 			text = text.replace(/ +(?= )/g,'');
// 			while (text.indexOf("  ")) {
// 				text.replace("  ",''); 
// 			}
// 			while (text.indexOf("	")) {
// 				text.replace("",''); 
// 			}

	// 		console.log(this);
	// 		console.log(this.toString());
// 			console.log(text);
	// 		console.log($(event.currentTarget).val());
			var param = CyoaParams.findOne({_id:Session.get("paramid")});
			Meteor.call("updateParamFieldValue", param, $(event.currentTarget).attr("data-data-index"), $(event.currentTarget).attr("data-value-index"), text);
	// 		console.log("js-editable-value key down");
			$(event.currentTarget).attr("data-clicked", "false");
		}
	},
	'click .js-add-value': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("addParamFieldValue", param, $(event.currentTarget).attr("data-data-index"));
// 		console.log("js-editable-value key down");
		$(event.currentTarget).attr("data-clicked", "false");
	},
	'click .js-add-data': function(event) {
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		Meteor.call("addParamField", param);
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