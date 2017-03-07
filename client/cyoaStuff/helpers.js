////////
/// cyoa	HELPERS
////////

Template.cyoaList.helpers({
	// find all visible cyoas
	cyoas:function(){
		return Cyoas.find({eventid:Session.get("eventid")});
	},
});
Template.cyoaMeta.helpers({
	// find all visible adventures
	adventures:function(){
// 			console.log("cyoaid");
// 			console.log(Session.get("cyoaid"));
		if (Session.get("cyoaid")) {
			var cyoa = Cyoas.findOne({_id:Session.get("cyoaid")});
			if (cyoa) {
// 				console.log(cyoa);
				return cyoa;
			}
		}
		return;
	},
	// find current world
	activeWorld:function(){
// 		console.log("worldid");
// 		console.log(Session.get("worldid"));
		return Worlds.findOne({_id:Session.get("worldid")});
	},
	ownerUserName : function() {
		console.log("ownerUserName");
		console.log(this.owner);
		console.log(Meteor.users.findOne({_id:this.owner}));
		return Meteor.users.findOne({_id:this.owner}).username;
	},
});
Template.cyoaItem.helpers({
});
Template.cyoaParams.helpers({
	// find all visible docs
	params:function(){
		return CyoaParams.find({eventid:Session.get("cyoaid")});
	},
});
// Template.cyoaItem.helpers({
// 	// find all visible docs
// 	pages:function(){
// 		return Pages.find({cyoaid:Session.get("cyoaid")});
// 	},
// });