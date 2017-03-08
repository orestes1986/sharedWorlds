Template.userItem.helpers({
	user:function(){
// 		console.log(Meteor.users.findOne({_id:Session.get("userHomeid")}));
// 		console.log(Meteor.users.findOne({_id:Session.get("userHomeid")}).profile);
		return Meteor.users.findOne({_id:Session.get("userHomeid")});
	},
});
Template.userInfo.helpers({
	first_name:function(){
// 		console.log(this.profile["first-name"]);
		return this.profile["first-name"];
	},
	last_name:function(){
// 		console.log(this.profile["last-name"]);
		return this.profile["last-name"];
	},
});
Template.userWorlds.helpers({
	world:function(){
		return Worlds.find({owner:this._id});
	},
	hasWorlds:function(){
		return Worlds.find({owner:this._id}).fetch();
	},
});
Template.userCyoas.helpers({
	cyoa:function(){
		return Cyoas.find({owner:this._id});
	},
	hasCyoas:function(){
		return Cyoas.find({owner:this._id}).fetch();
	},
});
Template.userBooks.helpers({
// 	user:function(){
// 		return;
// 	},
});
Template.userLikes.helpers({
// 	user:function(){
// 		return;
// 	},
});