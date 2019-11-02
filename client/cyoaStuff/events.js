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
			Meteor.call("removeCyoa", this._id); // calling: ~/sharedworlds/shared/cyoamain.js - removeCyoa/~ //
		}
	},
});
