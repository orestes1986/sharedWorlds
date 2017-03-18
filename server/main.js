// code that is only sent to the server. 

Meteor.startup(function () {
//	 create a starter doc if necessary
	if (!Tags.findOne()) {
		Tags.insert({ genre: 'sci-fi',		color: '#6d9eeb' });
		Tags.insert({ genre: 'science fiction',	color: '#6d9eeb' });
		Tags.insert({ genre: 'sf',		color: '#6d9eeb' });
		Tags.insert({ genre: 's.f.',		color: '#6d9eeb' });
		Tags.insert({ genre: 'fantasy',		color: '#76a5af' });
		Tags.insert({ genre: 'heroic fantasy',	color: '#ffe599' });
		Tags.insert({ genre: 'horror',	color: '#e06666' });
		Tags.insert({ genre: 'cyber punk',	color: '#674ea7' });
		Tags.insert({ genre: 'cyber-punk',	color: '#674ea7' });
		Tags.insert({ genre: 'cyberpunk',	color: '#674ea7' });
		Tags.insert({ genre: 'steam punk',	color: '#cccccc' });
		Tags.insert({ genre: 'steam-punk',	color: '#cccccc' });
		Tags.insert({ genre: 'steampunk',	color: '#cccccc' });
		Tags.insert({ genre: 'neutral',		color: '#fff2cc' });
		Tags.insert({ genre: 'realistic',		color: '#fff2cc' });
		Tags.insert({ genre: 'pragmatic',		color: '#fff2cc' });
		Tags.insert({ genre: 'romantic',		color: '#c27ba0' });
		Tags.insert({ genre: 'love story',		color: '#c27ba0' });
		Tags.insert({ genre: 'love-story',		color: '#c27ba0' });
		Tags.insert({ genre: 'love stories',		color: '#c27ba0' });
		Tags.insert({ genre: 'love-stories',		color: '#c27ba0' });
	}
	if (!Worlds.findOne()){// no documents yet!
		console.log("Tags length");
		console.log(Tags.find({}).fetch().length);
		Worlds.insert({title:"my new Worlds", description:"A dummy world", tags:[Tags.findOne({})._id], advSum:0, createdOn:new Date(), lastEdit:new Date()});
		for (var i = 0; i < 45; i++) {
			var pos0 = parseInt(Math.random() * (Tags.find({}).fetch().length - 0) + 0);
			var pos1 = parseInt(Math.random() * (Tags.find({}).fetch().length - 0) + 0);
			Worlds.insert({title:"my new Worlds "+i, description:"Another dummy world", tags:[Tags.find({}).fetch()[pos0]._id], advSum:0, createdOn:new Date(), lastEdit:new Date()});
		}
	}
});
// publish read access to collections

//////////////////////////////////
Meteor.publish("tags", function () {
//   if (this.userId) {
    return Tags.find({});
//   } else {
//     this.ready();
//   }
});
Meteor.publish("userData", function () {
//   if (this.userId) {
    return Meteor.users.find({},
                             {fields: {'username': 1, "profile": 1}});
//   } else {
//     this.ready();
//   }
});
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
});
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
});
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
});