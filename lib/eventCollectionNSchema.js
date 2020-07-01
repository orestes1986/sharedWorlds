// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
// db.events.find().pretty();
/////////////////////////////////////////////////// Events Stuff
/////////////////////////////////////////////////// Collection
this.Events = new Mongo.Collection("events"); // db.events.find().pretty();
/////////////////////////////////////////////////// Allowances
this.Events.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on adventure update");
		if (Meteor.user()){// they are logged in
			if (userId != doc.owner){// the user is messing about
				return false;
			} else {// the user is logged in, the adventure has the correct user id
				return true;
			}
		} else {// user not logged in
			return false;
		}
	},
	insert:function(userId, doc){
		console.log("testing security on adventure insert");
		if (Meteor.user()){// they are logged in
//			 if (userId != doc.owner){// the user is messing about
// 	return false;
//			 } else {// the user is logged in, the adventure has the correct user id
				return true;
//			 }
		} else {// user not logged in
			return false;
		}
	},
	remove:function(userId, doc){
		console.log("testing security on adventure remove");
		if (Meteor.user()){// they are logged in
			if (userId != doc.owner){// the user is messing about
				return false;
			} else {// the user is logged in, the adventure has the correct user id
				return true;
			}
		} else {// user not logged in
			return false;
		}
	}
});
/////////////////////////////////////////////////// Schema
this.Events.attachSchema(new SimpleSchema({
	content: {
		type:String,
		label: "Description",
		max: 60
	},
	start: {
		type: String,
		label: "Begining",
	},
	end: {
		type: String,
		label: "Ending",
		optional: true,
	},
	description: {
		type:String,
		label: "Description",
		optional: true,
		autoform: {
			rows: 5
		} // http://autoform.meteorapp.com/quickform
	},
	worldid:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	owner:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	createdOn:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	lastEdit:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
}));
// // set up a schema controlling the allowable 
// // structure of comment objects for adventures
// EventComments.attachSchema(new SimpleSchema({
// 	title: {
// 		type: String,
// 		label: "Title",
// 		max: 200
// 	},
// 	body:{
// 		type: String,
// 		label: "Comment",
// 		max: 1000
// 	},
// 	eventid:{
// 		type: String, 
// 	},
// 	owner:{
// 		type: String, 
// 	},
// }));
