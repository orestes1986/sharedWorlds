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
// 			
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