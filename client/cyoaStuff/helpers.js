////////
/// cyoa	HELPERS
////////

Template.constantPages.rendered = function() {
	Meteor.cyoaFunctions.timeline();
};
Template.constantPages.helpers({
	timeline:function() {
		Meteor.cyoaFunctions.timeline();
	},
});
Template.cyoaList.helpers({
	// find all visible cyoas
	cyoas:function(){
		return Cyoas.find({eventid:Session.get("eventid")});
	},
});
Template.cyoaMeta.helpers({
	checkConstantPageSum:function() {
		Meteor.cyoaFunctions.timeline();
	},
	constantPages:function(){
		return Pages.find( {cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "Constant" } } } ).fetch();
	},
	// find all visible adventures
	adventures:function(){
// 		console.log("cyoaid");
// 		console.log(Session.get("cyoaid"));
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
// 		console.log("ownerUserName");
// 		console.log(this.owner);
// 		console.log(Meteor.users.findOne({_id:this.owner}));
		return Meteor.users.findOne({_id:this.owner}).username;
	},
	isOwner: function(){
// 		console.log("cyoaMeta isOwner: ");
// 		console.log(this.owner);
// 		console.log(Meteor.userId());
		if (this.owner == Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	},
});
Template.cyoaItem.helpers({
	isOwner: function(){
// 		console.log("cyoaMeta isOwner: ");
// 		console.log(this.owner);
// 		console.log(Meteor.userId());
		if (this.owner == Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	},
	adventures:function(){
// 		console.log("cyoaid");
// 		console.log(Session.get("cyoaid"));
		if (Session.get("cyoaid")) {
			var cyoa = Cyoas.findOne({_id:Session.get("cyoaid")});
			if (cyoa) {
// 				console.log(cyoa);
				return cyoa;
			}
		}
		return;
	},
});
// Template.cyoaItem.helpers({
// 	// find all visible docs
// 	pages:function(){
// 		return Pages.find({cyoaid:Session.get("cyoaid")});
// 	},
// });
