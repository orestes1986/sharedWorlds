////////
/// gameAdvs	EVENTS
////////

Template.gameAdvList.events({
	// remove world button
	"click .js-add-gameAdv":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else { // they are logged in... lets insert a game
// 			console.log("Adding gameAdv");
			Meteor.call("addGameAdv", Session.get("cyoaid"));
		}
	},
});
Template.gameParamlist.events({
	"click .js-show-specific-parameter":function(event){
// 		console.log("js-show-specific-parameter clicked");
		$("#gameParamlist").modal('hide');
		Session.set("paramid", this._id);
		$("#gameParamItem").modal('show');
	},
});
Template.deleteGameAdv.events({
	// remove world button
	"click .js-remove-gameAdv":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else { // they are logged in... lets insert a world
// 			console.log(this._id);
// 			console.log("Deleting gameAdv");
// 			var cyoa = {_id:Session.get("worldid")};
			Meteor.call("removeGameAdv", this._id);
		}
	},
});
Template.gamePageItem.events({
	// remove world button
	"click .js-next-page":function(event){
// 		console.log("gamePageItem js-next-page was clicked");
// 		console.log(this._id);
// 		var player = Players.findOne( { _id:Session.get("playerid") } );
// 		player.pageid = this._id;
		Meteor.call("updatePlayerPage", Session.get("playerid"), this._id);
		Meteor.call("addingParamsToGameAdv", Session.get("playerid"), Session.get("gameid"));

	},
	"click .js-show-param-list" :function(event){
// 		console.log("showing the modal...");
		$("#gameParamlist").modal('show');
	},
});
