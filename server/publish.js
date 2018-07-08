
// publish read access to collections
//////////////////////////////////
Meteor.publish("tags", function () {
//	if (this.userId) {
		return Tags.find({});
//	} else {
//		this.ready();
//	}
});
Meteor.publish("userData", function () {
//	if (this.userId) {
		return Meteor.users.find({},
			{fields: {'username': 1, "profile": 1}});
//	} else {
//		this.ready();
//	}
});
// users editing stuff
// Meteor.publish("cyoaEditingUsers", function(){
// 	return CyoaEditingUsers.find();
// })
// 
// // coments on stuff
// Meteor.publish("cyoaComments", function(){
// 	return CyoaComments.find();
// })
//////////////////////////////////
// all visible worlds 
Meteor.publish("worlds", function(){
	return Worlds.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
//////////////////////////////////
// all visible events 
Meteor.publish("events", function(){
	return Events.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		]
	});
});
//////////////////////////////////
// all visible adventures 
Meteor.publish("cyoas", function(){
	return Cyoas.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
// parameters for params 
Meteor.publish("cyoaParams", function(){
	return CyoaParams.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
Meteor.publish("numParams", function(){
	return NumParams.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
//////////////////////////////////
// all visible pages of adventures 
Meteor.publish("pages", function(){
	return Pages.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
//////////////////////////////////
// all visible bodies of pages of adventures 
Meteor.publish("pagesBodies", function(){
	return PagesBodies.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
//////////////////////////////////
// all visible adventure games
Meteor.publish("gameAdvs", function(){
	return GameAdvs.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
// all visible players
Meteor.publish("players", function(){
	return Players.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
});
