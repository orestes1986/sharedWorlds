// code that is only sent to the server. 

Meteor.startup(function () {
//	 create a starter doc if necessary
	if (!Worlds.findOne()){// no documents yet!
		console.log("colorsTOtags length");
		console.log(colorsTOtags.length);
		Worlds.insert({title:"my new Worlds", description:"A dummy world", tags:["fantasy"], advSum:0, createdOn:new Date(), lastEdit:new Date()});
		for (var i = 0; i < 45; i++) {
			var pos0 = parseInt(Math.random() * (colorsTOtags.length - 0) + 0);
			var pos1 = parseInt(Math.random() * (colorsTOtags.length - 0) + 0);
			Worlds.insert({title:"my new Worlds "+i, description:"Another dummy world", tags:[colorsTOtags[pos0].genre], advSum:0, createdOn:new Date(), lastEdit:new Date()});
		}
	}
});
// publish read access to collections

//////////////////////////////////
//////////////////////////////////
// all visible worlds 
Meteor.publish("worlds", function(){
	return Worlds.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
})	
// // users editing worlds
// Meteor.publish("worldEditingUsers", function(){
// 	return WorldEditingUsers.find();
// })

// coments on worlds
// Meteor.publish("worldComments", function(){
// 	return WorldComments.find();
// })
//////////////////////////////////
//////////////////////////////////
// all visible events 
Meteor.publish("events", function(){
	return Events.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		]
	});
})	
// // users editing events
// Meteor.publish("eventEditingUsers", function(){
// 	return EventEditingUsers.find();
// })
// 
// // coments on events
// Meteor.publish("eventComments", function(){
// 	return EventComments.find();
// })
//////////////////////////////////
//////////////////////////////////
// all visible adventures 
Meteor.publish("cyoas", function(){
	return Cyoas.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
})	
// users editing adventures
// Meteor.publish("cyoaEditingUsers", function(){
// 	return CyoaEditingUsers.find();
// })
// 
// // coments on adventures
// Meteor.publish("cyoaComments", function(){
// 	return CyoaComments.find();
// })
//////////////////////////////////
// all visible pages of adventures 
Meteor.publish("pages", function(){
	return Pages.find({
	 $or:[
		{isPrivate:{$ne:true}}, 
		{owner:this.userId}
		] 
	});
})	